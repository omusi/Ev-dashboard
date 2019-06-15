import { ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { Font } from 'chartjs-plugin-datalabels/types/options';

export class ChartConstants {
  public static STACKED_ITEM = 'item';
  public static STACKED_TOTAL = 'total';
}

export { ChartData } from 'chart.js'; // could also use any local, but similar data definition!

export class SimpleChart {
  private chart: Chart;
  private chartType: string;
  private stackedChart = false;
  private chartOptions: ChartOptions;
  private chartData: ChartData;
  private roundedChartLabels: boolean;
  private constMinDivisorBar = 40;
  private constMinDivisorPie = 40;
  private withLegend = false;
  private itemsHidden = false;

  private language: string;
  private contextElement: ElementRef;
  private fontColor: string;
  private fontSize: string;
  private fontSizeNumber: number;
  private fontFamily: string;
  private font: Font;

  constructor(language: string, chartType: 'bar' | 'stackedBar' | 'pie', mainLabel: string,
    labelXAxis?: string, labelYAxis?: string,
    toolTipUnit?: string, withLegend = false, roundedChartLabels = true) {

    // Unregister global activation of Chart labels
    Chart.plugins.unregister(ChartDataLabels);

    Chart.Tooltip.positioners.customBar = function (elements, eventPosition) {
      // Put the tooltip at the center of the selected bar (or bar section), and not at the top:
      // @param elements {Chart.Element[]} the tooltip elements
      // @param eventPosition {Point} the position of the event in canvas coordinates
      // @returns {Point} the tooltip position
      let yOffset = 0;
      let sum = 0;
      const dataSets = elements[0]._chart.data.datasets;

      if (Array.isArray(dataSets)) {
        if (dataSets.length === 1) {
          yOffset = (elements[0]._chart.scales['y-axis-0'].bottom - elements[0]._model.y) / 2;
        } else {
          for (let i = 0; i < dataSets.length; i++) {
            if (i <= elements[0]._datasetIndex &&
              dataSets[i].stack === dataSets[elements[0]._datasetIndex].stack) {
              sum += dataSets[i].data[elements[0]._index];
            }
          }

          if (sum === 0) {
            yOffset = (elements[0]._chart.scales['y-axis-0'].bottom - elements[0]._model.y) / 2;
          } else {
            yOffset = dataSets[elements[0]._datasetIndex].data[elements[0]._index] / sum;
            yOffset *= (elements[0]._chart.scales['y-axis-0'].bottom - elements[0]._model.y) / 2;
          }
        }
      }

      return {
        x: elements[0]._model.x,
        y: elements[0]._model.y + yOffset
      };
    };

    this.language = language;

    switch (chartType) {
      case 'pie':
        this.createPieChartOptions(mainLabel, toolTipUnit, withLegend, roundedChartLabels);
        break;
      case 'bar':
        this.createBarChartOptions(false, mainLabel, labelXAxis, labelYAxis, toolTipUnit, withLegend, roundedChartLabels);
        break;
      case 'stackedBar':
        this.createBarChartOptions(true, mainLabel, labelXAxis, labelYAxis, toolTipUnit, withLegend, roundedChartLabels);
    }
  }

  public initChart(context: ElementRef): void {
    this.contextElement = context;

    this.chart = new Chart(this.contextElement.nativeElement.getContext('2d'), {
      type: this.chartType,
      plugins: [ChartDataLabels],
      options: this.chartOptions,
      data: { labels: [], datasets: [] }
    });
  }

  public updateChart(chartData: ChartData, mainLabel?: string): void {
    let anyChart: any;

    this.fontColor = getComputedStyle(this.contextElement.nativeElement).color;
    if (!this.fontColor || this.fontColor === '') {
      this.fontColor = 'black';
    }
    this.fontFamily = getComputedStyle(this.contextElement.nativeElement).fontFamily;
    if (!this.fontFamily || this.fontFamily === '') {
      this.fontFamily = '"Helvetica Neue", "Helvetica", "Arial", "sans-serif"';
    }
    this.font = { family: this.fontFamily };
    this.fontSize = getComputedStyle(this.contextElement.nativeElement).fontSize;
    if (!this.fontSize || this.fontSize === '') {
      this.fontSize = '18px';
      this.fontSizeNumber = 18;
    }
    this.fontSizeNumber = parseInt(this.fontSize, 10);
    this.fontSizeNumber = 18; // todo

    if (chartData) {
      this.updateChartOptions(chartData, mainLabel);
      this.updateChartData(chartData);
      this.chart.data = this.chartData;
      anyChart = this.chart; // type Chart does not know 'options'
      anyChart.options = this.chartOptions;
      this.chart = anyChart;
      this.chart.update();
    }
  }

  public showLegend(withUpdate: boolean = false) {
    if (!this.withLegend) {
      this.toggleHideLegend(withUpdate);
    }
  }

  public hideLegend(withUpdate: boolean = false) {
    if (this.withLegend) {
      this.toggleHideLegend(withUpdate);
    }
  }

  public toggleHideLegend(withUpdate: boolean = true) {
    let anyChart: any;

    this.withLegend = !this.withLegend;

    this.chartOptions['legend'].display = this.withLegend;

    anyChart = this.chart; // type Chart does not know 'options'
    anyChart.options = this.chartOptions;
    this.chart = anyChart;
    if (withUpdate) {
      this.chart.update();
    }
  }

  public toggleHideItems() {
    this.itemsHidden = !this.itemsHidden;

    if (this.stackedChart) {
      this.chartData.datasets.forEach((dataset) => {
        if (dataset.stack !== ChartConstants.STACKED_TOTAL) {
          dataset.hidden = this.itemsHidden;
        }
      });
    } else {
      const meta = this.chart.getDatasetMeta(0);
      meta.data.forEach((object) => {
        object.hidden = this.itemsHidden;
      });
    }

    this.chart.update();
  }

  public cloneChartData(chartData: ChartData, withZeroAmounts = false): ChartData {
    // cloning needed to display the same chart again (with animation)
    let newChartData: ChartData;

    let numberArray: number[];
    let anyArray: any[];

    if (chartData) {
      newChartData = { labels: [], datasets: [] };
      newChartData.labels = chartData.labels.slice();

      chartData.datasets.forEach((dataset) => {
        numberArray = [];
        anyArray = [];

        if (withZeroAmounts) {
          for (let i = 0; i < dataset.data.length; i++) {
            numberArray.push(0);
          }
          anyArray = numberArray;
        } else {

          anyArray = dataset.data.slice();
        }

        if (dataset.stack) {
          newChartData.datasets.push({ 'label': dataset.label, 'data': anyArray, 'stack': dataset.stack });
        } else {
          newChartData.datasets.push({ 'data': anyArray });
        }
      });

      this.updateChartData(newChartData);
    }

    return newChartData;
  }

  private createBarChartOptions(stacked: boolean, mainLabel: string, labelXAxis: string, labelYAxis: string,
    toolTipUnit: string, withLegend: boolean, roundedChartLabels: boolean): void {
    this.chartType = 'bar';
    this.stackedChart = stacked;
    this.withLegend = withLegend;
    this.roundedChartLabels = roundedChartLabels;

    this.chartOptions = {};

    this.chartOptions['title'] = {
      display: true,
      text: mainLabel,
      fontStyle: 'bold'
    };

    this.chartOptions['legend'] = {
      display: withLegend,
      labels: {},
      position: 'bottom'
    };

    this.chartOptions['plugins'] = {};
    this.chartOptions['plugins']['datalabels'] = {
      display: (context) => {
        return context.dataset.data[context.dataIndex] > 0;
      }
    };

    this.chartOptions['animation'] = {
      duration: 2000,
      easing: 'easeOutBounce'
    };

    this.chartOptions['tooltips'] = {
      enabled: true,
      position: 'customBar',
      callbacks: {
        label: (tooltipItem, data) => {
          let number = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let toolTip: string;

          if (this.roundedChartLabels &&
            typeof (number) === 'number') {
            number = Math.round(number);
          }
          if (this.stackedChart) {
            toolTip = data.datasets[tooltipItem.datasetIndex].label
              + ' : ' + number.toLocaleString(this.language);
          } else {
            toolTip = number.toLocaleString(this.language);
          }
          if (toolTipUnit) {
            toolTip = toolTip + ` ${toolTipUnit}`;
          }
          return toolTip;
        }
      }
    };

    this.chartOptions['scales'] = {
      xAxes:
        [{
          stacked: stacked,
          scaleLabel: {
            display: true,
            labelString: labelXAxis,
            fontStyle: 'bold',
          },
          ticks: {}
        }],
      yAxes:
        [{
          stacked: stacked,
          scaleLabel: {
            display: true,
            labelString: labelYAxis,
            fontStyle: 'bold',
          },
          ticks: {
            beginAtZero: true,
            callback: (value, index, values) => {
              return value.toLocaleString(this.language);
            }
          }
        }]
    };
  }

  private createPieChartOptions(mainLabel: string, toolTipUnit: string, withLegend: boolean, roundedChartLabels: boolean): void {
    this.chartType = 'pie';
    this.withLegend = withLegend;
    this.roundedChartLabels = roundedChartLabels;

    this.chartOptions = {};

    this.chartOptions['title'] = {
      display: true,
      text: mainLabel,
      fontStyle: 'bold'
    };

    this.chartOptions['legend'] = {
      display: withLegend,
      labels: {},
      position: 'bottom'
    };

    this.chartOptions['plugins'] = {};
    this.chartOptions['plugins']['datalabels'] = {
      display: (context) => {
        return context.dataset.data[context.dataIndex] > 0;
      },
    };

    this.chartOptions['animation'] = {
      duration: 2000,
      easing: 'easeOutBounce'
    };

    this.chartOptions['tooltips'] = {
      enabled: true,
      callbacks: {
        label: (tooltipItem, data) => {
          let number = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let toolTip: string;

          if (this.roundedChartLabels &&
            typeof (number) === 'number') {
            number = Math.round(number);
          }
          toolTip = data.labels[tooltipItem.index] + ' : '
            + number.toLocaleString(this.language);

          if (toolTipUnit) {
            toolTip = toolTip + ` ${toolTipUnit}`;
          }
          return toolTip;
        }
      }
    };
  }

  private updateChartOptions(chartData: ChartData, mainLabel: string): void {
    let minValue = 0;
    let number: any;
    let minDivisor = number;

    if (mainLabel) {
      this.chartOptions.title.text = mainLabel;
    }

    this.chartOptions.title.fontColor = this.fontColor;
    this.chartOptions.title.fontFamily = this.fontFamily;
    this.chartOptions.title.fontSize = this.fontSizeNumber;

    if (this.withLegend) {
      this.chartOptions.legend.labels.fontColor = this.fontColor;
      this.chartOptions.legend.labels.fontFamily = this.fontFamily;
    }

    if (this.chartType === 'pie') {
      minDivisor = this.constMinDivisorPie;
    } else {
      minDivisor = this.constMinDivisorBar;
      this.chartOptions.scales.xAxes.forEach((xAxis) => {
        xAxis.scaleLabel.fontColor = this.fontColor;
        xAxis.scaleLabel.fontFamily = this.fontFamily;
        xAxis.ticks.fontColor = this.fontColor;
        xAxis.ticks.fontFamily = this.fontFamily;
      });
      this.chartOptions.scales.yAxes.forEach((yAxis) => {
        yAxis.scaleLabel.fontColor = this.fontColor;
        yAxis.scaleLabel.fontFamily = this.fontFamily;
        yAxis.ticks.fontColor = this.fontColor;
        yAxis.ticks.fontFamily = this.fontFamily;
      });
    }

    this.chartOptions.tooltips.backgroundColor = this.fontColor;
    this.chartOptions.tooltips.bodyFontFamily = this.fontFamily;
    this.chartOptions.tooltips.footerFontFamily = this.fontFamily;
    this.chartOptions.tooltips.titleFontFamily = this.fontFamily;

    if (this.stackedChart) {
      chartData.datasets.forEach((dataset) => {
        if (Array.isArray(dataset.data) === true &&
          dataset.stack === ChartConstants.STACKED_TOTAL) {
          for (let i = 0; i < dataset.data.length; i++) {
            number = dataset.data[i];
            if (typeof (number) === 'number') {
              if (number > minValue) {
                minValue = number;
              }
            }
          }
        }
      });
      minValue = minValue / minDivisor;
    } else {
      chartData.datasets.forEach((dataset) => {
        if (Array.isArray(dataset.data) === true) {
          for (let i = 0; i < dataset.data.length; i++) {
            number = dataset.data[i];
            if (typeof (number) === 'number') {
              minValue = minValue + number;
            }
          }
        }
      });
      minValue = minValue / minDivisor;
    }

    this.chartOptions['plugins']['datalabels'] = {
      color: this.fontColor,
      font: this.font,
      display: (context) => {
        return context.dataset.data[context.dataIndex] > minValue;
      },
      //  font: { weight: 'bold' },
      formatter: (value, context) => {
        if (this.roundedChartLabels) {
          return Math.round(value).toLocaleString(this.language);
        } else {
          return value.toLocaleString(this.language);
        }
      }
    };
  }

  private updateChartData(chartData: ChartData) {
    let countData = 0;

    this.chartData = chartData;

    if (!this.chartData.labels) {
      this.chartData.labels = [];
    }

    if (!this.chartData.datasets) {
      this.chartData.datasets = [];
    }

    if (this.stackedChart) {
      chartData.datasets.forEach((dataset) => {
        if (dataset.stack === ChartConstants.STACKED_TOTAL) {
          dataset.hidden = false;
          dataset.backgroundColor = 'lightgrey';
          dataset.borderWidth = 0;
        } else {
          dataset.stack = ChartConstants.STACKED_ITEM; // to be sure
          dataset.hidden = false;
          dataset.backgroundColor = this.getColorCode(countData);
          countData++;
          dataset.borderWidth = 0;
        }
      });
    } else {
      chartData.datasets.forEach((dataset) => {
        dataset.hidden = false;
        dataset.backgroundColor = [];
        for (let i = 0; i < dataset.data.length; i++) {
          dataset.backgroundColor.push(this.getColorCode(i));
        }

        dataset.borderWidth = 0;
      });
    }
  }

  private getColorCode(counter: number) {
    const colors = [
      [144, 238, 144, 0.8],
      [255, 165, 0, 0.5],
      [135, 206, 235, 0.8],
      [222, 184, 135, 0.5],
      [255, 182, 193, 0.8],
      [102, 205, 170, 0.5],
      [255, 160, 122, 0.8],
      [70, 130, 180, 0.5],
      [255, 222, 173, 0.8],
      [218, 112, 214, 0.5],
      [144, 238, 144, 0.5],
      [255, 165, 0, 0.8],
      [135, 206, 235, 0.5],
      [222, 184, 135, 0.8],
      [255, 182, 193, 0.5],
      [102, 205, 170, 0.8],
      [255, 160, 122, 0.5],
      [70, 130, 180, 0.8],
      [255, 222, 173, 0.5],
      [218, 112, 214, 0.8]
    ];

    const div20 = counter % 20;
    return `rgba(${colors[div20][0]}, ${colors[div20][1]}, ${colors[div20][2]}, ${colors[div20][3]})`;
  }
}
