import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import data from '../../../../russian-losses.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public currentLossesChart: any;

  public personnel: number;
  public personnelDelta: string = '';
  public tanks: number;
  public tanksDelta: string = '';
  public afv: number;
  public afvDelta: string = '';
  public artillery: number;
  public artilleryDelta: string = '';
  public mlrs: number;
  public mlrsDelta: string = '';
  public adf: number;
  public adfDelta: string = '';
  public jets: number;
  public jetsDelta: string = '';
  public helicopters: number;
  public helicoptersDelta: string = '';
  public uav: number;
  public uavDelta: string = '';
  public cruiseMissiles: number;
  public cruiseMissilesDelta: string = '';
  public warShips: number;
  public warShipsDelta: string = '';
  public vehicles: number;
  public vehiclesDelta: string = '';
  public specialEquipment: number;
  public specialEquipmentDelta: string = '';
  public date: string;

  ngOnInit(): void {
    this.date = data[data.length - 1]['date'];
    this.personnel = data[data.length - 1]['personnel'];
    this.tanks = data[data.length - 1]['tanks'];
    this.afv = data[data.length - 1]['afv'];
    this.artillery = data[data.length - 1]['artillery'];
    this.mlrs = data[data.length - 1]['mlrs'];
    this.adf = data[data.length - 1]['adf'];
    this.jets = data[data.length - 1]['jets'];
    this.helicopters = data[data.length - 1]['helicopters'];
    this.uav = data[data.length - 1]['uav'];
    this.cruiseMissiles = data[data.length - 1]['cruiseMissiles'];
    this.warShips = data[data.length - 1]['warShips'];
    this.vehicles = data[data.length - 1]['vehicles'];
    this.specialEquipment = data[data.length - 1]['specialEquipment'];

    if (data[data.length - 1]['personnelDetla'] > 0) { 
      this.personnelDelta = '(+' + data[data.length - 1]['personnelDetla'] + ')';
    }

    if (data[data.length - 1]['tanksDelta'] > 0) { 
      this.tanksDelta = '(+' + data[data.length - 1]['tanksDelta'] + ')';
    }

    if (data[data.length - 1]['afvDelta'] > 0){ 
      this.afvDelta = '(+' + data[data.length - 1]['afvDelta'] + ')';
    }

    if (data[data.length - 1]['artilleryDelta'] > 0) { 
      this.artilleryDelta = '(+' + data[data.length - 1]['artilleryDelta'] + ')';
    }

    if (data[data.length - 1]['artilleryDelta'] > 0) { 
      this.artilleryDelta = '(+' + data[data.length - 1]['artilleryDelta'] + ')';
    }

    if (data[data.length - 1]['mlrsDelta']) {
      this.mlrsDelta = '(+' + data[data.length - 1]['mlrsDelta'] + ')';
    }

    if (data[data.length - 1]['adfDelta'] > 0) {
      this.adfDelta = '<div class="delta">(+' + data[data.length - 1]['adfDelta'] + ')</div>';
    }

    if (data[data.length - 1]['jetsDelta']) {
      this.jetsDelta = '(+' + data[data.length - 1]['jetsDelta'] + ')';
    }

    if (data[data.length - 1]['helicoptersDelta']) {
      this.helicoptersDelta = '(+' + data[data.length - 1]['helicoptersDelta'] + ')';
    }

    if (data[data.length - 1]['uavDelta']) {
      this.uavDelta = '(+' + data[data.length - 1]['uavDelta'] + ')';
    }

    if (data[data.length - 1]['cruiseMissilesDelta']) {
      this.cruiseMissilesDelta = '(+' + data[data.length - 1]['cruiseMissilesDelta'] + ')';
    }

    if (data[data.length - 1]['warShipsDelta']) {
      this.warShipsDelta = '(+' + data[data.length - 1]['warShipsDelta'] + ')';
    }

    if (data[data.length - 1]['vehiclesDelta']) {
      this.vehiclesDelta = '(+' + data[data.length - 1]['vehiclesDelta'] + ')';
    }

    if (data[data.length - 1]['specialEquipmentDelta']) {
      this.specialEquipmentDelta = '(+' + data[data.length - 1]['specialEquipmentDelta'] + ')';
    }

    this.createTroopsChart();
  }

  createTroopsChart() {
    var datesArray = new Array();
    var pesonnelArray = new Array();

    for (let i = data.length - 90; i < data.length; i+=3)
    {
      datesArray.push(data[i]['date']);
      pesonnelArray.push(data[i]['personnel']);
    }

    this.currentLossesChart = new Chart("CurrentLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: "Troops Losses",
            data: pesonnelArray,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgb(255, 0, 0, 0.8)'
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 2,
      }     
    });
  }
}
