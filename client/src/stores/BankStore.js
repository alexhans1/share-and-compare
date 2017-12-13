import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
// import SampleData from './SampleData';

class BankStore extends EventEmitter {
  constructor() {
    super();
    this.costs = null;
    this.chartData = null;
    this.providers = null;
    this.banks = null;

    // setTimeout(() => {
    //   this.chartData = SampleData.chartData;
    //   this.providers = SampleData.providers;
    //   this.emit('change');
    // }, 1000)

  }

  getCosts () {
    return this.costs;
  }

  getChartData () {
    return this.chartData;
  }

  getProviders () {
    return this.providers;
  }

  getBanks () {
    return this.banks;
  }

  async fetchCarsharingCosts(bankIds, bankingUserIds, bankingPINs) {

    try {
      await fetch('/finApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankIds,
          bankingUserIds,
          bankingPINs,
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.costs = data.total;
        this.providers = data.providers;
        this.chartData = data.chartData;
        this.emit('change');
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  async searchBanks(search, page) {

    try {
      await fetch('/finApi/getBanks/' + search + '/' + page, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.banks = data || [];
        this.emit('changeBanks');
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  handleAction(action) {
    switch (action.type){
      case "FETCH_CARSHARING_COSTS": {
        this.fetchCarsharingCosts(action.bankIds, action.bankingUserIds, action.bankingPINs);
        break;
      }
      case "SEARCH_BANKS": {
        this.searchBanks(action.search, action.page);
        break;
      }
      default: {
        // do nothing
      }
    }
  }
}

const bankStore = new BankStore();

dispatcher.register(bankStore.handleAction.bind(bankStore));

export default bankStore;
