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

  barThickness: number = 30;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    let troopsMap = new Map<string, number>();
    let tanksMap = new Map<string, number>();
    let afvMap = new Map<string, number>();
    let vehiclesMap = new Map<string, number>();
    let artilleryMap = new Map<string, number>();

    for (let key in data) {

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

      if (vehiclesMap.get((data[key]['date'].split('-'))[1]))
      {
        let val = vehiclesMap.get((data[key]['date'].split('-'))[1])!;

        vehiclesMap.set((data[key]['date'].split('-'))[1], data[key]['vehiclesDelta'] + val);
      }
      else
      {
        vehiclesMap.set((data[key]['date'].split('-'))[1], data[key]['vehiclesDelta']);
      }

      if (artilleryMap.get((data[key]['date'].split('-'))[1]))
      {
        let val = artilleryMap.get((data[key]['date'].split('-'))[1])!;

        artilleryMap.set((data[key]['date'].split('-'))[1], data[key]['artilleryDelta'] + val);
      }
      else
      {
        artilleryMap.set((data[key]['date'].split('-'))[1], data[key]['artilleryDelta']);
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
            barThickness : this.barThickness
          },
          {
            label: "Tanks Losses",
            data: Array.from(tanksMap.values()),
            backgroundColor: ChartProps.TanksChartBGColor,
            barThickness : this.barThickness
          },
          {
            label: "AFV Losses",
            data: Array.from(afvMap.values()),
            backgroundColor: ChartProps.AFVChartBGColor,
            barThickness : this.barThickness
          },
          {
            label: "Vehicles Losses",
            data: Array.from(vehiclesMap.values()),
            backgroundColor: ChartProps.VehiclesChartBGColor,
            barThickness : this.barThickness
          },
          {
            label: "Artillery Losses",
            data: Array.from(artilleryMap.values()),
            backgroundColor: ChartProps.ArtilleryChartBGColor,
            barThickness : this.barThickness
          }
        ]
      },
      options: {
        aspectRatio: 3        
      }     
    });
  }

}
