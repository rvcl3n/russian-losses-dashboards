import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import data from '../../../../russian-losses.json';
import { ChartProps } from '../helpers/chart-props';

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
    let troopsMap = new Map<string, number>();
    let tanksMap = new Map<string, number>();
    let afvMap = new Map<string, number>();

    for (var key in data) {

      if (troopsMap.get((data[key]['date'].split('-'))[1]))
      {
        let val = troopsMap.get((data[key]['date'].split('-'))[1])!;

        troopsMap.set((data[key]['date'].split('-'))[1], data[key]['personnelDetla'] + val);
      }
      else
      {
        troopsMap.set((data[key]['date'].split('-'))[1], data[key]['personnelDetla']);
      }

      if (tanksMap.get((data[key]['date'].split('-'))[1]))
      {
        let val = tanksMap.get((data[key]['date'].split('-'))[1])!;

        tanksMap.set((data[key]['date'].split('-'))[1], data[key]['tanksDelta'] + val);
      }
      else
      {
        tanksMap.set((data[key]['date'].split('-'))[1], data[key]['tanksDelta']);
      }

      if (afvMap.get((data[key]['date'].split('-'))[1]))
      {
        let val = afvMap.get((data[key]['date'].split('-'))[1])!;

        afvMap.set((data[key]['date'].split('-'))[1], data[key]['afvDelta'] + val);
      }
      else
      {
        afvMap.set((data[key]['date'].split('-'))[1], data[key]['afvDelta']);
      }
    }

    this.chart = new Chart("LossesChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Array.from(troopsMap.keys()), 
	       datasets: [
          {
            label: "Troops Losses",
            data: Array.from(troopsMap.values()),
            backgroundColor: ChartProps.PersonnelBGColor,
            barThickness : 50
          },
          {
            label: "Tanks Losses",
            data: Array.from(tanksMap.values()),
            backgroundColor: ChartProps.TanksChartBGColor,
            barThickness : 50
          },
          {
            label: "AFV Losses",
            data: Array.from(afvMap.values()),
            backgroundColor: ChartProps.AFVChartBGColor,
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
