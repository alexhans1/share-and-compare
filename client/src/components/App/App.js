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

    this.getChartPage = this.getChartPage.bind(this);
    this.getBanks = this.getBanks.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  }

  componentWillMount() {
    BankStore.on('fetch', this.getChartPage);
    BankStore.on('changeBanks', this.getBanks);
  }

  componentWillUnmount() {
    BankStore.removeListener('fetch', this.getChartPage);
    BankStore.removeListener('changeBanks', this.getBanks);
    document.getElementById("navbar-container").className = '';
  }

  componentDidMount() {
    document.getElementById("navbar-container").className += ' navbar-absolute';
  }

  getChartPage() {
    this.props.history.push('/chart');
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
    const connections = this.state.connections.filter(({submitted}) => submitted);
    if (connections.length) {
      BankActions.fetchCarsharingCosts(
        connections.map(({bankId}) => bankId),
        connections.map(({bankingUserId}) => bankingUserId),
        connections.map(({bankingPIN}) => bankingPIN)
      )
    }
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
                          <button className="btn btn-lg btn-custom-green mr-auto"
                                  onClick={this.submitRequest.bind(this)}>
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

      </div>
    );
  }
}

export default App;
