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

  public datesArray = new Array();
  public tanksArray = new Array();
  public pesonnelArray = new Array();
  public afvArray = new Array();
  public artilleryArray = new Array();
  public mlrsArray = new Array();
  public adfArray  = new Array();
  public jetsArray = new Array();
  public helicoptersArray = new Array();
  public uavArray = new Array();
  public cruiseMissilesArray = new Array();
  public warShipsArray = new Array();
  public vehiclesArray = new Array();
  public specialEquipmentArray = new Array();


  ngOnInit(): void {

    const parsedDate = new Date(Date.parse(data[data.length - 1]['date']));

    this.date = parsedDate.getDate() + '.' + (parsedDate.getMonth() + 1) + '.' + parsedDate.getFullYear();
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
    for (let i = data.length - 90; i < data.length; i+=3)
    {
      this.datesArray.push(data[i]['date']);
      this.pesonnelArray.push(data[i]['personnel']);
      this.tanksArray.push(data[i]['tanks']);
      this.afvArray.push(data[i]['afv']);
      this.artilleryArray.push(data[i]['artillery']);
      this.mlrsArray.push(data[i]['mlrs']);
      this.adfArray.push(data[i]['adf']);
      this.jetsArray.push(data[i]['jets']);
      this.helicoptersArray.push(data[i]['helicopters']);
      this.uavArray.push(data[i]['uav']);
      this.cruiseMissilesArray.push(data[i]['cruiseMissiles']);
      this.warShipsArray.push(data[i]['warShips']);
      this.vehiclesArray.push(data[i]['vehicles']);
      this.specialEquipmentArray.push(data[i]['specialEquipment']);
    }

    this.currentLossesChart = new Chart("CurrentLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.datesArray, 
	       datasets: [
          {
            label: "Troops Losses",
            data: this.pesonnelArray,
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

  public onListClick(lossesType: string) {

    switch(lossesType)
    {
      case "Personnel": {
        this.currentLossesChart.data.datasets[0].data = this.pesonnelArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(255, 0, 0, 0.8)';
        break;
      }
      case "Tanks": {
        this.currentLossesChart.data.datasets[0].data = this.tanksArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(50, 205, 50, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(34, 139, 34, 0.8)';
        break;
      }
      case "AFV": {
        this.currentLossesChart.data.datasets[0].data = this.afvArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 71, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(255, 69, 0, 0.8)';
        break;
      }
      case "AFV": {
        this.currentLossesChart.data.datasets[0].data = this.afvArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 71, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(255, 69, 0, 0.8)';
        break;
      }
      case "Artillery": {
        this.currentLossesChart.data.datasets[0].data = this.artilleryArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 71, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(255, 69, 0, 0.8)';
        break;
      }
      case "MLRS": {
        this.currentLossesChart.data.datasets[0].data = this.mlrsArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 255, 102, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(215, 215, 0, 0.8)';
        break;
      }
      case "ADF": {
        this.currentLossesChart.data.datasets[0].data = this.adfArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(238, 130, 238, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(255, 0, 255, 0.8)';
        break;
      }
      case "Jets": {
        this.currentLossesChart.data.datasets[0].data = this.jetsArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(135, 206, 250, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(30, 144, 255, 0.8)';
        break;
      }
      case "Helicopters": {
        this.currentLossesChart.data.datasets[0].data = this.helicoptersArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(32, 178, 170, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(85, 140, 100, 0.8)';
        break;
      }
      case "UAV": {
        this.currentLossesChart.data.datasets[0].data = this.uavArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 215, 0, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(218, 165, 32, 0.8)';
        break;
      }
      case "Cruise Missiles": {
        this.currentLossesChart.data.datasets[0].data = this.cruiseMissilesArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(169, 169, 169, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(128, 128, 128, 0.8)';
        break;
      }
      case "War Ships": {
        this.currentLossesChart.data.datasets[0].data = this.warShipsArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(23, 104, 238, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(106, 90, 205, 0.8)';
        break;
      }
      case "Vehicles": {
        this.currentLossesChart.data.datasets[0].data = this.vehiclesArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(165, 42, 42, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(128, 0, 0, 0.8)';
        break;
      }
      case "Special Equipment": {
        this.currentLossesChart.data.datasets[0].data = this.specialEquipmentArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = 'rgba(255, 182, 193, 0.8)';
        this.currentLossesChart.data.datasets[0].borderColor = 'rgb(255, 105, 180, 0.8)';
        break;
      }
      default: {
        console.log('Chart error: wrong losses type');
        break;
      }
    }

    this.currentLossesChart.data.datasets[0].label = lossesType + ' Losses';
    
    this.currentLossesChart.update();

  }
}
