import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as data from '../../../../russian-losses.json';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-total-losses',
  templateUrl: './total-losses.component.html',
  styleUrls: ['./total-losses.component.css']
})
export class TotalLossesComponent implements OnInit {

  public troopsChart: any;
  public groundForcesChart: any;
  public airForcesChart: any;


  ngOnInit(): void {
    this.createTroopsChart();
    this.createVehiclesChart();
    this.createAirForcesChart();
  }

  createTroopsChart() {
    let datesArray = new Array();
    let pesonnelArray = new Array();

    for (let key in data) {
      datesArray.push(data[key]['date']);
      pesonnelArray.push(data[key]['personnel']);
    }

    this.troopsChart = new Chart("TroopsLossesChart", {
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
        aspectRatio: 3,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          }
        },
        animation: {
          duration: 0
        }
      }     
    });
  }

  createVehiclesChart() {
    let datesArray = new Array();
    let tanksArray = new Array();
    let afvArray = new Array();
    let artilleryArray = new Array();
    let mlrsArray = new Array();
    let adfArray = new Array();
    let vehicles = new Array();
    let specialEquipment = new Array();

    for (let key in data) {
      datesArray.push(data[key]['date']);
      tanksArray.push(data[key]['tanks']);
      afvArray.push(data[key]['afv']);
      artilleryArray.push(data[key]['artillery']);
      mlrsArray.push(data[key]['mlrs']);
      adfArray.push(data[key]['adf']);
      vehicles.push(data[key]['vehicles']);
      specialEquipment.push(data[key]['specialEquipment']);
    }

    this.groundForcesChart = new Chart("GroundForcesLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
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
          },
          {
            label: "Artillery Losses",
            data: artilleryArray,
            backgroundColor: 'rgba(0, 255, 255, 0.8)',
            borderColor: 'rgb(0, 206, 209, 0.8)'
          },
          {
            label: "MLRS Losses",
            data: mlrsArray,
            backgroundColor: 'rgba(255, 255, 102, 0.8)',
            borderColor: 'rgb(215, 215, 0, 0.8)'
          },
          {
            label: "ADF Losses",
            data: adfArray,
            backgroundColor: 'rgba(238, 130, 238, 0.8)',
            borderColor: 'rgb(255, 0, 255, 0.8)'
          },
          {
            label: "Vehicles Losses",
            data: vehicles,
            backgroundColor: 'rgba(165, 42, 42, 0.8)',
            borderColor: 'rgb(128, 0, 0, 0.8)'
          },
          {
            label: "Special Equipment Losses",
            data: specialEquipment,
            backgroundColor: 'rgba(255, 182, 193, 0.8)',
            borderColor: 'rgb(255, 105, 180, 0.8)'
          }
        ]
      },
      options: {
        aspectRatio: 3,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          }
        },
        animation: {
          duration: 0
        }
      }     
    });
  }

  createAirForcesChart() {
    let datesArray = new Array();
    let jetsArray = new Array();
    let helicoptersArray = new Array();
    let uavArray = new Array();
    let cruiseMissiles = new Array();
    let warShips = new Array();

    for (let key in data) {
      datesArray.push(data[key]['date']);     
      jetsArray.push(data[key]['jets']);
      helicoptersArray.push(data[key]['helicopters']);
      uavArray.push(data[key]['uav']);
      cruiseMissiles.push(data[key]['cruiseMissiles']);
      warShips.push(data[key]['warShips']);
    }

    this.airForcesChart = new Chart("AirForcesLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: "Jets Losses",
            data: jetsArray,
            backgroundColor: 'rgba(135, 206, 250, 0.8)',
            borderColor: 'rgb(30, 144, 255, 0.8)'
          },
          {
            label: "Helicopters Losses",
            data: helicoptersArray,
            backgroundColor: 'rgba(32, 178, 170, 0.8)',
            borderColor: 'rgb(85, 140, 100, 0.8)'
          },
          {
            label: "UAV Losses",
            data: uavArray,
            backgroundColor: 'rgba(255, 215, 0, 0.8)',
            borderColor: 'rgb(218, 165, 32, 0.8)'
          },
          {
            label: "Cruise Missiles Losses",
            data: cruiseMissiles,
            backgroundColor: 'rgba(169, 169, 169, 0.8)',
            borderColor: 'rgb(128, 128, 128, 0.8)'
          },
          {
            label: "War Ships Losses",
            data: warShips,
            backgroundColor: 'rgba(23, 104, 238, 0.8)',
            borderColor: 'rgb(106, 90, 205, 0.8)'
          }
        ]
      },
      options: {
        aspectRatio: 3,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          }
        },
        animation: {
          duration: 0
        }
      }     
    });
  }
}
