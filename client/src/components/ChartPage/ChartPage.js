import React, { Component } from 'react';
import './ChartPage.css';
import BankStore from '../../stores/BankStore';
import Chart from './Chart/Chart';
import {Row, FormGroup, Label, Input, } from 'reactstrap';

class ChartPage extends Component {
  constructor() {
    super();
    this.state = {
      carsharingCosts: null,
      chartData: [],
      providerColors: [],
      showMenu: false,
      typeFilters: {
        car: true,
        scooter: true,
        bike: true,
      },
      chartIsStacked: true,
    };
    this.getChartData = this.getChartData.bind(this);
  }

  componentWillMount() {
    BankStore.on('fetch', this.getChartData);
  }

  componentWillUnmount() {
    BankStore.removeListener('fetch', this.getChartData);
  }

  getChartData() {
    const providers = BankStore.getProviders();
    if (!providers) {
      return
    }
    const providerNames = providers.map(({name}) => name);
    const providerColors = providers.map(({color}) => color);
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
      providerColors,
    });
  }

  handleTypeCheckbox(event) {
    let typeFilters = this.state.typeFilters;
    typeFilters[event.target.name] = !typeFilters[event.target.name];
    this.setState({
      typeFilters,
    });
  }

  handleToggleChartType() {
    this.setState({
      chartIsStacked: !this.state.chartIsStacked,
    });
  }

  render() {

    const {chartData, providerColors, showMenu, typeFilters, chartIsStacked, } = this.state;

    return (
      <div className="container-fluid">
        <div id="chartPage-background" />
        <Row className="d-flex align-items-center">

          <div id="chartPage-left-container">
            {
              chartData.length ?
                <Chart chartData={chartData}
                       colors={providerColors}
                       isStacked={this.state.chartIsStacked} /> :
                null
            }
            <span id="chartMenuToggle" onClick={() => {this.setState({showMenu: !showMenu})}}>
              <i className={showMenu ? 'fa fa-times' : 'fa fa-bars'} aria-hidden="true" />
              &ensp;{showMenu ? 'Close' : 'Menu'}
            </span>
          </div>

          <div id="chartMenu" className={showMenu ? null : 'hideChartMenu'}>
            <h4>Options</h4>

            <div className="mt-4 d-flex flex-column">
              <h5>Type of ride</h5>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" name="car"
                         onChange={this.handleTypeCheckbox.bind(this)}
                         checked={typeFilters.car} /> Car
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" name="scooter"
                         onChange={this.handleTypeCheckbox.bind(this)}
                         checked={typeFilters.scooter} /> Scooter
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" name="bike"
                         onChange={this.handleTypeCheckbox.bind(this)}
                         checked={typeFilters.bike} /> Bike
                </Label>
              </FormGroup>
            </div>

            <div className="mt-4 d-flex flex-column">
              <h5>Type of chart</h5>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="stacked"
                         onChange={this.handleToggleChartType.bind(this)}
                         checked={chartIsStacked} />{' '}
                  Stacked columns
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="columns"
                         onClick={this.handleToggleChartType.bind(this)}
                         checked={!chartIsStacked} />{' '}
                  Columns
                </Label>
              </FormGroup>
            </div>

          </div>
        </Row>
      </div>
    );
  }
}

export default ChartPage;
