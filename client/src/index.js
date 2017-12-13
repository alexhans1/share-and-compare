import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home';
import App from './components/App/App';
import Chart from "./components/Chart/Chart";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch, } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/app" component={App} />
        <Route path="/chart" component={Chart} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
