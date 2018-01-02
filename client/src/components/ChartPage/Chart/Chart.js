import React from 'react';
import './Chart.css';
import { Chart, } from 'react-google-charts';

class DataChart extends React.Component {
  constructor(props) {
    super(props);

    this.textColor = '#fefefe';
    this.state = {
      options: {
        title: 'Total: ' + props.carsharingCosts + ' €   ' +
        'Average: ' + Math.round(props.carsharingCosts / (props.chartData.length - 1) * 100) /100 + ' €',
        titleTextStyle: {
          color: this.textColor,
          bold: true,
          fontSize: 24,
        },
        backgroundColor: { fill:'transparent' },
        colors: [...props.colors, '#8d8d8d', '#504d4c'],
        hAxis: {
          textStyle:{color: this.textColor},
          titleTextStyle: {
            color: this.textColor,
          },
        },
        vAxis: {
          format: '€ #',
          textStyle:{color: this.textColor},
          titleTextStyle: {
            color: this.textColor,
          },
          viewWindow: {
            min: 0,
          },
        },
        legend: {textStyle:{color: this.textColor,},},
        isStacked: props.isStacked,
        seriesType: 'bars',
        series: {},
      },
      data: props.chartData,
    };
    if (this.state.options.isStacked) {
      this.state.data = this.state.data.map((row) => {
        let arr = row.slice(0);
        return arr.splice(0, arr.length-2);
      });
    } else {
      this.state.options.series[props.chartData[0].length-3] = {
        type: 'line',
        curveType: 'function',
        hidden: true,
      };
      this.state.options.series[props.chartData[0].length-2] = {
        type: 'line',
        curveType: 'function',
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isStacked !== nextProps.isStacked) {
      let options = this.state.options;
      options.isStacked = nextProps.isStacked;
      let data = nextProps.chartData;
      if (nextProps.isStacked) {
        data = nextProps.chartData.map((row) => {
          let arr = row.slice(0);
          return arr.splice(0, arr.length-2);
        });
      } else {
        options.series[nextProps.chartData[0].length-3] = {
          type: 'line',
          curveType: 'function',
          hidden: true,
        };
        options.series[nextProps.chartData[0].length-2] = {
          type: 'line',
          curveType: 'function',
        };
      }

      this.setState({
        data,
        options,
      });
    }

    if (this.props.chartData !== nextProps.chartData) {
      this.buildChart(nextProps);
    }
  }

  buildChart(props) {
    console.log(props);
    let options = {
        title: 'Total: ' + props.carsharingCosts + ' €   ' +
        'Average: ' + Math.round(props.carsharingCosts / (props.chartData.length - 1) * 100) /100 + ' €',
        titleTextStyle: {
          color: this.textColor,
          bold: true,
          fontSize: 24,
        },
        backgroundColor: { fill:'transparent' },
        colors: [...props.colors, '#8d8d8d', '#504d4c'],
        hAxis: {
          textStyle:{color: this.textColor},
          titleTextStyle: {
            color: this.textColor,
          },
        },
        vAxis: {
          format: '€ #',
          textStyle:{color: this.textColor},
          titleTextStyle: {
            color: this.textColor,
          },
          viewWindow: {
            min: 0,
          },
        },
        legend: {textStyle:{color: this.textColor,},},
        isStacked: props.isStacked,
        seriesType: 'bars',
        series: {},
      },
      data = props.chartData;

    if (props.isStacked ) {
      data = data.map((row) => {
        let arr = row.slice(0);
        return arr.splice(0, arr.length-2);
      });
    } else {
      options.series[props.chartData[0].length-3] = {
        type: 'line',
        curveType: 'function',
        hidden: true,
      };
      options.series[props.chartData[0].length-2] = {
        type: 'line',
        curveType: 'function',
      };
    }

    this.setState({
      data,
      options,
    });
  }

  render() {
    return (
      <Chart
        chartType="ComboChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="ComboChart"
        width="100%"
        height="80vh"
        legend_toggle
      />
    );
  }
}
export default DataChart;
