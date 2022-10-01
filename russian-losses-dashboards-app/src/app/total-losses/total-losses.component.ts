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
    var lossesArray = new Array();

    for (var key in data) {
      console.log(data[key]['personnel']);
      datesArray.push(data[key]['date']);
      lossesArray.push(data[key]['personnel']);
  }

    this.chart = new Chart("TotalLossesChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: "Troops Losses",
            data: lossesArray,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgb(255, 0, 0, 0.8)'
          }
        ]
      },
      options: {
        aspectRatio: 3        
      }     
    });
  }

}
