import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("LossesChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ["March","April","May","June","July","August","September(updating)"], 
	       datasets: [
          {
            label: "Troops Losses",
            data: [3900,5800,7200,5050,5280,6870,1450],
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            barThickness : 50
          }
        ]
      },
      options: {
        aspectRatio: 3        
      }     
    });
  }
}
