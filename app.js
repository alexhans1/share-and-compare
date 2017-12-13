const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let dotenv = require('dotenv'); //enables environment variables for development
dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// disable CORS when local
if (app.get('env')) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

//setup routes URIs
const index = require('./routes/index');
const finApi = require('./routes/finApi');
app.use('/', index);
app.use('/finApi', finApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
console.log('ENV: ' + app.get('env'));
console.log('Listening to port: ' + port);
