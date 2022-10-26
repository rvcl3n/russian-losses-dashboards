import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as data from '../../../../russian-losses.json';
import { ChartProps } from '../helpers/chart-props';
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

  aspectRatioValue: number;

  ngOnInit(): void {
    this.createTroopsChart();
    this.createVehiclesChart();
    this.createAirForcesChart();
  }

  createTroopsChart() {
    let datesArray = new Array();
    let pesonnelArray = new Array();
    
    this.aspectRatioValue = window.innerWidth < 1000 ? 1.5 : 3;
 
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
            backgroundColor: ChartProps.PersonnelBGColor,
            borderColor: ChartProps.PersonnelBorderColor
          }
        ]
      },
      options: {
        aspectRatio: this.aspectRatioValue,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: false,
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
            backgroundColor: ChartProps.TanksChartBGColor,
            borderColor: ChartProps.TanksChartBorderColor
          },
          {
            label: "AFV Losses",
            data: afvArray,
            backgroundColor: ChartProps.AFVChartBGColor,
            borderColor: ChartProps.ADFChartBorderColor
          },
          {
            label: "Artillery Losses",
            data: artilleryArray,
            backgroundColor: ChartProps.ArtilleryChartBGColor,
            borderColor: ChartProps.ArtilleryChartBorderColor
          },
          {
            label: "MLRS Losses",
            data: mlrsArray,
            backgroundColor: ChartProps.MLRSChartBGColor,
            borderColor: ChartProps.MLRSChartBorderColor
          },
          {
            label: "ADF Losses",
            data: adfArray,
            backgroundColor: ChartProps.ADFChartBGColor,
            borderColor: ChartProps.ADFChartBorderColor
          },
          {
            label: "Vehicles Losses",
            data: vehicles,
            backgroundColor: ChartProps.VehiclesChartBGColor,
            borderColor: ChartProps.VehiclesChartBorderColor
          },
          {
            label: "Special Equipment Losses",
            data: specialEquipment,
            backgroundColor: ChartProps.SpecialEquipmentChartBGColor,
            borderColor: ChartProps.SpecialEquipmentChartBorderColor
          }
        ]
      },
      options: {
        aspectRatio: this.aspectRatioValue,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: false,
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
            backgroundColor: ChartProps.JetsChartBGColor,
            borderColor: ChartProps.JetsChartBorderColor
          },
          {
            label: "Helicopters Losses",
            data: helicoptersArray,
            backgroundColor: ChartProps.HelicoptersChartBGColor,
            borderColor: ChartProps.HelicoptersChartBorderColor
          },
          {
            label: "UAV Losses",
            data: uavArray,
            backgroundColor: ChartProps.UAVChartBGColor,
            borderColor: ChartProps.UAVChartBorderColor
          },
          {
            label: "Cruise Missiles Losses",
            data: cruiseMissiles,
            backgroundColor: ChartProps.CruiseMissilesChartBGColor,
            borderColor: ChartProps.CruiseMissilesChartBorderColor
          },
          {
            label: "War Ships Losses",
            data: warShips,
            backgroundColor: ChartProps.WarShipsChartBGColor,
            borderColor: ChartProps.WarShipsChartBorderColor
          }
        ]
      },
      options: {
        aspectRatio: this.aspectRatioValue,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: false,
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

  public chartOnClick = (chart: any) => {
    if (chart.options.plugins.zoom.zoom.wheel.enabled == true){
      chart.options.plugins.zoom.zoom.wheel.enabled = false;
    }
    else {
      chart.options.plugins.zoom.zoom.wheel.enabled = true;
    }
    chart.update();
  }
}
