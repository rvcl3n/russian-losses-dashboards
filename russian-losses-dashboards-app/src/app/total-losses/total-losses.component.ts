import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as data from '../../../../russian-losses.json';

@Component({
  selector: 'app-total-losses',
  templateUrl: './total-losses.component.html',
  styleUrls: ['./total-losses.component.css']
})
export class TotalLossesComponent implements OnInit {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    var datesArray = new Array();
    var pesonnelArray = new Array();
    var tanksArray = new Array();
    var afvArray = new Array();

    for (var key in data) {
      datesArray.push(data[key]['date']);
      pesonnelArray.push(data[key]['personnel']);
      tanksArray.push(data[key]['tanks']);
      afvArray.push(data[key]['afv']);
    }

    this.chart = new Chart("TotalLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: "Troops Losses",
            data: pesonnelArray,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgb(255, 0, 0, 0.8)'
          },
          {
            label: "Tanks Losses",
            data: tanksArray,
            backgroundColor: 'rgba(50, 205, 50, 0.8)',
            borderColor: 'rgb(34, 139, 34, 0.8)'
          },
          {
            label: "AFV Losses",
            data: afvArray,
            backgroundColor: 'rgba(255, 99, 71, 0.8)',
            borderColor: 'rgb(255, 69, 0, 0.8)'
          }
        ]
      },
      options: {
        aspectRatio: 3        
      }     
    });
  }

}
