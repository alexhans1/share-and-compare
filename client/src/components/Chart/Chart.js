import React from 'react';
import { Chart, } from 'react-google-charts';
import { Button, } from 'reactstrap'

class DataChart extends React.Component {
  constructor(props) {
    super(props);

    let textColor = '#fefefe';
    this.state = {
      options: {
        title: 'Your monthly carsharing expenses.',
        titleTextStyle: {
          color: textColor,
        },
        backgroundColor: { fill:'transparent' },
        colors: [...props.colors, '#8d8d8d', '#504d4c'],
        hAxis: {
          title: 'Month',
          textStyle:{color: textColor},
          titleTextStyle: {
            color: textColor,
          },
        },
        vAxis: {
          title: 'Costs in €',
          format: 'short',
          textStyle:{color: textColor},
          titleTextStyle: {
            color: textColor,
          },
          viewWindow: {
            min: 0,
          },
        },
        legend: {textStyle:{color: textColor,},},
        isStacked: true,
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

  toggleStacked() {
    let options = this.state.options;
    options.isStacked = !options.isStacked;
    this.setState({
      options,
    });
    if (this.state.options.isStacked) {
      this.setState({
        data: this.props.chartData.map((row) => {
          let arr = row.slice(0);
          return arr.splice(0, arr.length-2);
        }),
      });
    } else {
      let options = this.state.options;
      options.series[this.props.chartData[0].length-3] = {
        type: 'line',
        curveType: 'function',
        hidden: true,
      };
      options.series[this.props.chartData[0].length-2] = {
        type: 'line',
        curveType: 'function',
      };
      this.setState({
        options,
        data: this.props.chartData,
      });
    }
  }

  render() {
    return (
      <div>

        <Button onClick={this.toggleStacked.bind(this)} style={{position: 'fixed', top: 10, left: 10, zIndex: 10}}>
          toggle stacked
        </Button>

        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="ComboChart"
          width="100%"
          height="700px"
          legend_toggle
        />
      </div>
    );
  }
}
export default DataChart;
