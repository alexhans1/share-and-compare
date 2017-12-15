import React, { Component } from 'react';
import './App.css';
import '../Loader/Loader.css';
import Form from '../Form/Form';
import BankConnectionCard from "./BankConnectionCard/BankConnectionCard";
import Loader from '../Loader/Loader';
import BankStore from '../../stores/BankStore';
import * as BankActions from '../../actions/BankActions';
import BankIcon from './noun_1283521_cc.svg';
import { Row, Col, } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      carsharingCosts: null,
      chartData: [],
      connections: [
        {
          id: Date.now(),
          bankId: '',
          bankName: '',
          bankingUserId: '',
          bankingPIN: '',
          submitted: false,
          isCollapsed: false,

          // id: Date.now(),
          // bankId: '123',
          // bankName: 'Deutsche kreditbank Berlin',
          // bankingUserId: '',
          // bankingPIN: '',
          // submitted: true,
        },
      ],
      banksData: {
        banks: [],
      },
      showLoader: false,
    };

    this.providerColors = [];

    this.getCosts = this.getCosts.bind(this);
    this.getBanks = this.getBanks.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  }

  componentWillMount() {
    BankStore.on('change', this.getCosts);
    BankStore.on('changeBanks', this.getBanks);
  }

  componentWillUnmount() {
    BankStore.removeListener('change', this.getCosts);
    BankStore.removeListener('changeBanks', this.getBanks);
    document.getElementById("navbar-container").className = '';
  }

  componentDidMount() {
    document.getElementById("navbar-container").className += ' navbar-absolute';
  }

  getCosts() {

    const providers = BankStore.getProviders();
    const providerNames = providers.map(({name}) => name);
    this.providerColors = providers.map(({color}) => color);
    const rawData = BankStore.getChartData() || [];
    let columns = ['Month', ...providerNames, 'Average', 'Sum'];
    let months = [];
    rawData.forEach((transaction) => {
      if (!months.includes(transaction.date.substring(0,7))) {
        months.push(transaction.date.substring(0,7));
      }
    });
    months.sort();
    let data = [];
    months.forEach((month) => {
      data.push([month])
    });
    data.forEach((arr, index) => {
      for (let i = 0; i < columns.length - 1; i++) {
        data[index].push(0)
      }
    });

    rawData.forEach((transaction) => {
      const providerIndex = columns.indexOf(transaction.provider);
      let dateIndex = months.indexOf(transaction.date.substring(0,7));
      if (dateIndex === -1) {
        data.push([transaction.date.substring(0,7)]);
        dateIndex = data.length - 1;
      }
      data[dateIndex][providerIndex] = (data[dateIndex][providerIndex] || 0) + transaction.amount;
    });

    data = data.map((arr) => {
      let sum = 0;
      for (let i = 1; i < arr.length - 2; i++) {
        sum += arr[i];
      }
      arr[arr.length-2] = Math.round(sum / (arr.length - 3) * 100) / 100;
      arr[arr.length-1] = sum;
      return arr;
    });

    const chartData = [columns, ...data];

    this.setState({
      carsharingCosts: BankStore.getCosts(),
      chartData,
      showLoader: false,
    });
  }

  getBanks() {
    this.setState({
      banksData: BankStore.getBanks(),
      showLoader: false,
    });
  }

  toggleLoader() {
    this.setState({
      showLoader: !this.state.showLoader,
    });
  }

  toggleCollapse(connectionId) {
    let connections = this.state.connections;
    connections.find(({id}) => connectionId === id).isCollapsed = !connections.find(({id}) => connectionId === id).isCollapsed;
    this.setState({
      connections,
    });
  }

  handleChangeFor = (propertyName, connectionId, bankSearchString = null) => (event) => {
    if (propertyName === 'bankSearch') {
      if (bankSearchString) {
        BankActions.searchBanks(bankSearchString, 1);
      } else {
        setTimeout(() => {
          this.setState({
            banksData: {
              banks: [],
            },
          });
        }, 1000);
      }
      return
    }
    let connectionIndex = this.state.connections.findIndex(conn => conn.id === connectionId);
    let connections = this.state.connections;
    connections[connectionIndex][propertyName] = event.target.value;
    this.setState({ connections, });
  };

  submitConnection() {
    let connections = this.state.connections;
    connections[connections.length - 1].submitted = true;
    connections.push({
      id: Date.now(),
      bankId: '',
      bankName: '',
      bankingUserId: '',
      bankingPIN: '',
      submitted: false,
      isCollapsed: false,
    });

    this.setState({
      banksData: {
        banks: [],
      },
      connections,
    });
  }

  deleteConnection(connectionId) {
    let connections = this.state.connections;
    const index = this.state.connections.find(({id}) => connectionId);
    connections = connections.splice(0, index).concat(connections.splice(1, connections.length - index));
    if (!connections.length) {
      connections.push({
        id: Date.now(),
        bankId: '',
        bankName: '',
        bankingUserId: '',
        bankingPIN: '',
        submitted: false,
      })
    }
    this.setState({
      connections,
    });
  }

  submitRequest() {
    if (!this.state.showLoader) this.toggleLoader();
    BankActions.fetchCarsharingCosts(
      this.state.connections.map(({bankId}) => bankId),
      this.state.connections.map(({bankingUserId}) => bankingUserId),
      this.state.connections.map(({bankingPIN}) => bankingPIN)
    )
  }

  handleBankSelection = (bankId, bankName, connectionId) => () => {
    let connectionIndex = this.state.connections.findIndex(conn => conn.id === connectionId);
    let connections = this.state.connections;
    connections[connectionIndex]['bankId'] = bankId;
    connections[connectionIndex]['bankName'] = bankName;
    this.setState({
      connections,
      banksData: {
        banks: [],
      },
    });
  };

  render() {
    const { banksData, connections } = this.state;
    banksData.banks = banksData.banks || [];

    let loader = (this.state.showLoader) ? <div className={'spinner-container'}><Loader /></div> : null;

    return (
      <div>
        {loader}

        <div id="left-background" />
        <Row id="app-container">
          <Col id="left-container">
            <div id="title">
            <span>
              Add a connection to your bank -
              <br/>
              We screen your transactions for carsharing expenses.
            </span>
            </div>

            {/*list of connections*/}
            <div className="mt-5 align-self-start" style={{width: '100%'}}>
              {connections.map((connection, index) => {
                return (
                  (connection.submitted) ?
                    <div key={connection.id} className="d-flex flex-column">
                      {(index === 0) ? <h1 className="mb-3">Bank Connections:</h1> : null}
                      <BankConnectionCard connection={connection}
                                          deleteBankConnection={this.deleteConnection}
                                          toggleCollapse={this.toggleCollapse} />
                      {
                        (index === connections.length - 2) ?
                          <button className="btn btn-lg btn-custom-green mr-auto">
                            Start Analysing
                          </button>
                          :
                          null
                      }
                    </div>
                    :
                    null
                )
              })}
            </div>
          </Col>

          <Col id="right-container">
            <div id="bankIconContainer">
              <img id="bankIcon" src={BankIcon} alt=""/>
              <h3 className="mb-4">Add a connection</h3>
            </div>

            <Form key={connections[connections.length - 1].id}
                  connection={connections[connections.length - 1]}
                  banksData={banksData}
                  handleBankSelection={this.handleBankSelection.bind(this)}
                  handleChangeFor={this.handleChangeFor.bind(this)}
                  handleSubmit={this.submitConnection.bind(this)} />
          </Col>
        </Row>

        {/*<div id="left-container">*/}
        {/*<div id="title">*/}
        {/*<span>*/}
        {/*Add a connection to your bank -*/}
        {/*<br/>*/}
        {/*We screen your transactions for carsharing expenses.*/}
        {/*</span>*/}
        {/*</div>*/}

        {/*list of connections*/}
        {/*<div className="mt-5 align-self-start" style={{width: '100%'}}>*/}
        {/*{this.state.connections.map((connection, index) => {*/}
        {/*return (*/}
        {/*(connection.submitted) ?*/}
        {/*<div key={connection.id} className="d-flex flex-column">*/}
        {/*{(index === 0) ? <h1 className="mb-3">Bank Connections:</h1> : null}*/}
        {/*<div className="alert alert-light" role="alert" style={{maxWidth: '80%', paddingLeft: '28px'}}>*/}
        {/*{connection.bankName}*/}
        {/*<i id="editBankConnection"*/}
        {/*className="fa fa-bars"*/}
        {/*aria-hidden="true" />*/}
        {/*</div>*/}
        {/*{*/}
        {/*(index === this.state.connections.length - 2) ?*/}
        {/*<button className="btn btn-lg btn-custom-green mr-auto">*/}
        {/*Start Analysing*/}
        {/*</button>*/}
        {/*:*/}
        {/*null*/}
        {/*}*/}
        {/*</div>*/}
        {/*:*/}
        {/*null*/}
        {/*)*/}
        {/*})}*/}
        {/*</div>*/}
        {/*</div>*/}

        {/*<div id="right-container" className="container-fluid">*/}
        {/*<div id="bankIconContainer">*/}
        {/*<img id="bankIcon" src={BankIcon} alt=""/>*/}
        {/*<h3 className="mb-4">Lorum Ipsum</h3>*/}
        {/*</div>*/}

        {/*<Form key={this.state.connections[this.state.connections.length - 1].id}*/}
        {/*connection={this.state.connections[this.state.connections.length - 1]}*/}
        {/*banksData={this.state.banksData}*/}
        {/*handleBankSelection={this.handleBankSelection.bind(this)}*/}
        {/*handleChangeFor={this.handleChangeFor.bind(this)}*/}
        {/*handleSubmit={this.submitConnection.bind(this)} />*/}
        {/*</div>*/}

      </div>

    );
  }
}

export default App;
