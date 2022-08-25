import React from "react";

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


const ChartComponent = ({ data }) => {

  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars per language",
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
        // palleteColors: '#fff',
        theme: "candy"
      },
      // Chart Data
      data,
    }
  };

  return (<ReactFC {...chartConfigs} />)
}
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default ChartComponent;