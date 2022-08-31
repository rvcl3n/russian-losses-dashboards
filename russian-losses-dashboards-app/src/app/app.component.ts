import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'russian-losses-dashboards-app';
  
  highcharts = HighCharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: "russian losses"
    },
    xAxis: {
      categories: ["March","April","May","June","July","August"],
      title: {
        text: "Months"
      }
    },
    yAxis: {
      title: {
        text: "Losses"
      }
    },
    series: [
      {
      name: "Troops",
      data: [3900,5800,7200,5050,5280,6870],
      type: 'line'
      }
  ]
  }
}
