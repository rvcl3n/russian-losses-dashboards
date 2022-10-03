import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import data from '../../../../russian-losses.json';

@Component({
  selector: 'app-monthly-losses',
  templateUrl: './monthly-losses.component.html',
  styleUrls: ['./monthly-losses.component.css']
})
export class MonthlyLossesComponent implements OnInit {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    let map = new Map<string, number>();

    for (var key in data) {

      if (map.get((data[key]['date'].split('-'))[1]))
      {
        let val = map.get((data[key]['date'].split('-'))[1])!;

        map.set((data[key]['date'].split('-'))[1], data[key]['personnelDetla'] + val);
      }
      else
      {
        map.set((data[key]['date'].split('-'))[1], data[key]['personnelDetla']);
      }
    }

    this.chart = new Chart("LossesChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Array.from(map.keys()), 
	       datasets: [
          {
            label: "Troops Losses",
            data: Array.from(map.values()),
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
