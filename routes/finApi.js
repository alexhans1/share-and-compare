let express = require('express');
let router = express.Router();
const dotenv = require('dotenv'); //enables environment variables for development
dotenv.config({path: '../.env'});
const moment = require('moment');

const request = require('request-promise');

const productionURL = 'https://sandbox.finapi.io';
const usedURL = productionURL;

const CLIENT_ID = process.env.finApiClientID;
const CLIENT_SECRET = process.env.finApiClientSecret;

const DEV_MODE = express().get('env') === 'development';

let ACCESS_TOKEN = null;
let REFRESH_TOKEN = null;
let USER_TOKEN = null;
let USER_REFRESH_TOKEN = null;
let ACCESS_TOKEN_EXPIRES_IN = null;
let USER_TOKEN_EXPIRES_IN = null;

let PROVIDERS = require('../Providers');

router.post('/', async (req, res) => {

  let CONNECTION_ID = null;
  let TRANSACTIONS = [];
  let READY_CONNECTIONS = [];

  let bankIds = [];
  let bankingUserIds = [];
  let bankingPINs = [];
  try {
    if (typeof req.body.bankIds === 'string') bankIds = JSON.parse(req.body.bankIds);
    else bankIds = req.body.bankIds;
    if (typeof req.body.bankingUserIds === 'string') bankingUserIds = JSON.parse(req.body.bankingUserIds);
    else bankingUserIds = req.body.bankingUserIds;
    if (typeof req.body.bankingPINs === 'string') bankingPINs = JSON.parse(req.body.bankingPINs);
    else bankingPINs = req.body.bankingPINs;
  } catch (ex) {
    console.error(ex);
  }

  if (
    bankIds.length === bankingUserIds.length &&
    bankIds.length === bankingPINs.length &&
    bankIds.length
  ) {

    // get Access- and User Tokens if necessary
    if (moment(ACCESS_TOKEN_EXPIRES_IN).isBefore(moment()) || ACCESS_TOKEN_EXPIRES_IN === null) {
      await getAccessToken();
    }

    if (moment(USER_TOKEN_EXPIRES_IN).isBefore(moment()) || USER_TOKEN === null) {
      await getUserToken();
    }

    // import bank connections
    for (let i = 0; i < bankIds.length; i++) {
      if (bankIds[i] && bankingUserIds[i] && bankingPINs[i]) {
        await importBankConnection(bankIds[i], bankingUserIds[i], bankingPINs[i])
      }
    }
  }

  async function importBankConnection(bankId, bankingUserId, bankingPIN) {
    // import new bank connection
    let importBankConnectionOptions = {
      method: 'POST',
      url: usedURL + '/api/v1/bankConnections/import',
      body: {
        "bankId": bankId,
        "bankingUserId": bankingUserId,
        "bankingPin": bankingPIN,
        "storePin": false,
        "name": "tempAccount",
        "skipPositionsDownload": false,
        "maxDaysForDownload": 0,
      },
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + USER_TOKEN,
      },
      json: true,
    };

    try {
      await request(importBankConnectionOptions)
      .then(async function (parsedBody) {
        CONNECTION_ID = parsedBody.id;

        if (DEV_MODE) console.log('CONNECTION_ID', CONNECTION_ID);
        await getConnectionStatus(USER_TOKEN, CONNECTION_ID);
      })
      .catch(async function (err) {
        console.error("$$$ Error while importing bank connections.");
        console.error(err.message);
        if (err.statusCode === 422) {
          console.log('$$$ Deleting excisting connections and re-run.');
          await deleteBankConnection();
          await importBankConnection(bankId, bankingUserId, bankingPIN);
        }
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  async function getConnectionStatus(userToken, connectionID) {

    let connStatus = null;

    let getConnectionStatusOptions = {
      method: 'GET',
      url: usedURL + '/api/v1/bankConnections/' + connectionID,
      headers: {
        'Authorization': 'Bearer ' + userToken,
      },
      json: true,
    };

    try {
      await request(getConnectionStatusOptions)
      .then(async (parsedBody) => {
        connStatus = parsedBody.updateStatus;
        if (DEV_MODE) console.log('updateStatus', parsedBody.updateStatus);
        if (parsedBody.updateStatus === 'READY') {

          READY_CONNECTIONS.push(parsedBody.id);

          if (READY_CONNECTIONS.length && READY_CONNECTIONS.length === bankIds.length) {
            getAllTransactions(1);
          }
          // else {
          //   console.error('$$$ Bank connection import failed.');
          //   // delete potential connections
          //   await deleteBankConnection();
		  //
          //   res.send('Bank connection import failed.');
          // }

          console.log('$$$ Imported bank connection.');
        }
        else {
          try {
            setTimeout(async () => {
              await getConnectionStatus(userToken, connectionID);
            }, 1500);
          } catch (ex) {
            console.log(ex);
          }
        }
      })
      .catch(function (err) {
        console.error("$$$ Error while getting connection status.");
        console.log(err.message);
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function getAllTransactions(page) {

    let getAllTransactionsOptions = {
      method: 'GET',
      url: usedURL + '/api/v1/transactions?view=userView&' +
      'direction=all&' +
      'order=bankBookingDate&' +
      'includeChildCategories=true&' +
      'page=' + page + '&' +
      'perPage=200&',
      headers: {
        'Authorization': 'Bearer ' + USER_TOKEN,
      },
      json: true,
    };

    try {
      await request(getAllTransactionsOptions)
      .then(async function (parsedBody) {
        // if (DEV_MODE) console.log('transactions', parsedBody);
        TRANSACTIONS.push(...parsedBody.transactions);
        if (parsedBody.paging.pageCount > parsedBody.paging.page) {
          if(DEV_MODE) console.log('Getting more results');
          await getAllTransactions(parseInt(parsedBody.paging.page) + 1);
        }
        else {
          // process transactions
          await processTransactions();

          // and delete bank connections
          setTimeout(async () => {
            await deleteBankConnection();
          }, 1500);
        }
      })
      .catch(function (err) {
        console.error("$$$ Error while getting all transactions.");
        console.log(err.message);
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function deleteBankConnection() {

    let deleteBankConnectionOptions = {
      method: 'DELETE',
      url: usedURL + '/api/v1/bankConnections',
      headers: {
        'Authorization': 'Bearer ' + USER_TOKEN,
      },
    };

    try {
      await request(deleteBankConnectionOptions)
      .then(function (res) {
        if (DEV_MODE) console.log(res);
        console.log('$$$ Successfully deleted all bank connections.');
      })
      .catch(function (err) {
        if (err.statusCode === 423) {
          setTimeout(() => {
            deleteBankConnection()
          }, 2000)
        } else {
          console.error("$$$ Error while deleting all bank connections.");
          console.log(err);
        }
      });
    } catch (ex) {
      console.error("$$$ Error while deleting all bank connections.");
      console.log(ex);
    }
  }

  async function processTransactions() {

    try {
      if (!TRANSACTIONS || TRANSACTIONS === []) {
        console.log('No transactions.');
        res.send('No transactions.')
      } else {
        let carSharingTransactions = TRANSACTIONS.filter((transaction) => {
          let BreakException = {},
            isCarsharingTransaction = false;
          try {
            for (key in PROVIDERS) {
              PROVIDERS[key].transactionStrings.forEach((transactionStringArray) => {
                let fullfillsAll = [];
                transactionStringArray.forEach((transactionString) => {
                  if (transaction.purpose && transaction.purpose.includes(transactionString)) fullfillsAll.push(true);
                  else fullfillsAll.push(false);
                });
                if (!fullfillsAll.includes(false) && fullfillsAll !== []) {
                  isCarsharingTransaction = true;
                  throw BreakException;
                }
              })
            }
          } catch (ex) {
            if (ex !== BreakException) console.error(ex);
          }
          return isCarsharingTransaction;
        });
        let providers = [];
        let chartData = carSharingTransactions.map((transaction) => {
          let BreakException = {},
            returnObject = {};
          try {
            for (provider in PROVIDERS) {
              PROVIDERS[provider].transactionStrings.forEach((transactionStringArray) => {
                let fulfillsAll = [];
                transactionStringArray.forEach((transactionString) => {
                  if (transaction.purpose && transaction.purpose.includes(transactionString)) fulfillsAll.push(true);
                  else fulfillsAll.push(false);
                });
                if (!fulfillsAll.includes(false) && fulfillsAll !== []) {
                  if (!providers.filter(p => p.name === PROVIDERS[provider].name).length) {
                    providers.push({
                      name: PROVIDERS[provider].name,
                      color: PROVIDERS[provider].color,
                    });
                  }

                  returnObject = {
                    provider: PROVIDERS[provider].name,
                    amount: -transaction.amount,
                    date: moment(transaction.bankBookingDate)
                  };
                  throw BreakException;
                }
              })
            }
          } catch (ex) {
            if (ex !== BreakException) console.error(ex);
          }
          return returnObject;
        });
        let sum = carSharingTransactions.map(({amount}) => -amount).reduce((a, b) => a + b, 0);
        res.json({
          total: Math.round(sum*100)/100,
          chartData,
          providers,
        });
      }
    } catch (ex) {
      console.error(ex);
    }

  }

});

router.get('/getBanks/:search/:page', async (req, res) => {

  // get Access-Token if necessary
  if (moment(ACCESS_TOKEN_EXPIRES_IN).isBefore(moment()) || ACCESS_TOKEN_EXPIRES_IN === null) {
    await getAccessToken();
  }

  if (req.params.search) {

    let getBanksOptions = {
      method: 'GET',
      url: usedURL + '/api/v1/banks?search=' + req.params.search +
      '&isSupported=true&isTestBank=false&page=' + (req.params.page || 1) + '&perPage=5',
      headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
      },
    };

    try {
      await request(getBanksOptions)
      .then((result) => {
        if (DEV_MODE) console.log(result);
        console.log("$$$ Successfully received bank ids.");
        res.send(result);
      })
      .catch(function (err) {
        console.error("$$$ Error while getting all bank ids.");
        console.error(err);
      });
    } catch (ex) {
      console.error("$$$ Error while getting all bank ids.");
      console.error(ex);
    }

  }

});

async function getAccessToken() {
  // get Access Token
  let authenticateClientOptions = {
    method: 'POST',
    url: usedURL + '/oauth/token?grant_type=client_credentials&' +
    'client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET,
    headers: [{
      name: 'content-type',
      value: 'application/json',
    }],
    json: true,
  };

  await request(authenticateClientOptions)
  .then((parsedBody) => {
    ACCESS_TOKEN = parsedBody.access_token;
    REFRESH_TOKEN = parsedBody.refresh_token;
    ACCESS_TOKEN_EXPIRES_IN = moment().add(parsedBody.expires_in, 'seconds');
  })
  .catch(() => {
    console.error("$$$ Error while getting client token.");
  });

  if (DEV_MODE) console.log('ACCESS_TOKEN', ACCESS_TOKEN);
}

async function getUserToken() {
  // authenticate finApi shareAndCompare User
  let authenticateUserOptions = {
    method: 'POST',
    url: usedURL + '/oauth/token?grant_type=password&' +
    'client_id=' + CLIENT_ID + '&' +
    'client_secret=' + CLIENT_SECRET + '&' +
    'username=' + process.env.finApiUsername + '&password=' + process.env.finApiUserPassword,
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    json: true,
  };
  try {
    await request(authenticateUserOptions)
    .then((parsedBody) => {
      USER_TOKEN = parsedBody.access_token;
      USER_REFRESH_TOKEN = parsedBody.refresh_token;
      USER_TOKEN_EXPIRES_IN = moment().add(parsedBody.expires_in, 'seconds');
    })
    .catch(function (err) {
      console.error("$$$ Error while authenticating user.");
      console.error(err.message);
    });
  } catch (ex) {
    console.error("$$$ Error while authenticating user.");
    console.error(ex);
  }

  if (DEV_MODE) console.log('USER_TOKEN', USER_TOKEN);
}

module.exports = router;
