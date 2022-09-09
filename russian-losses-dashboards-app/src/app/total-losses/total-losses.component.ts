import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

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
  
    this.chart = new Chart("TotalLossesChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ["February","March","April","May","June","July","August","September(updating)"], 
	       datasets: [
          {
            label: "Troops Losses",
            data: [5710,12200,17700,23500,30700,35750,41030,48350],
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
