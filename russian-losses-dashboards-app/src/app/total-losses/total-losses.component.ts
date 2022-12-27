import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ChartProps } from '../helpers/chart-props';
import { TranslateService } from '@ngx-translate/core';
import { RestLossesService } from '../rest-losses.service';
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
  public restData: any;

  aspectRatioValue: number;

  public LossesChartLoader: string = "CurrentLossesChartLoader";

  constructor(private translate: TranslateService, private restLossesService: RestLossesService) 
  {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    if (localStorage.getItem('locale'))
    {
      const locale = localStorage.getItem('locale') ?? 'en';

      translate.use(locale);
    }
    else
    {
      translate.use('en');
    }

    this.translate.onLangChange.subscribe(()=> 
    {
      this.troopsChart.data.datasets[0].label = this.translate.instant('TOTALLOSSES.LINE_PERSONNEL');

      this.groundForcesChart.data.datasets[0].label = this.translate.instant('TOTALLOSSES.LINE_TANKS');
      this.groundForcesChart.data.datasets[1].label = this.translate.instant('TOTALLOSSES.LINE_AFV');
      this.groundForcesChart.data.datasets[2].label = this.translate.instant('TOTALLOSSES.LINE_ARTILLERY');
      this.groundForcesChart.data.datasets[3].label = this.translate.instant('TOTALLOSSES.LINE_MLRS');
      this.groundForcesChart.data.datasets[4].label = this.translate.instant('TOTALLOSSES.LINE_ADF');
      this.groundForcesChart.data.datasets[5].label = this.translate.instant('TOTALLOSSES.LINE_VEHICLES');
      this.groundForcesChart.data.datasets[6].label = this.translate.instant('TOTALLOSSES.LINE_SPECIAL_EQUIPMENT');

      this.airForcesChart.data.datasets[0].label = this.translate.instant('TOTALLOSSES.LINE_JETS');
      this.airForcesChart.data.datasets[1].label = this.translate.instant('TOTALLOSSES.LINE_HELICOPTERS');
      this.airForcesChart.data.datasets[2].label = this.translate.instant('TOTALLOSSES.LINE_UAV');
      this.airForcesChart.data.datasets[3].label = this.translate.instant('TOTALLOSSES.LINE_CRUISE_MISSILES');
      this.airForcesChart.data.datasets[4].label = this.translate.instant('TOTALLOSSES.LINE_WAR_SHIPS');

      this.troopsChart.update();
      this.groundForcesChart.update();
      this.airForcesChart.update();
    });
  }

  ngOnInit(): void {
    this.restLossesService.getTotalLosses().subscribe(res => 
      {
        this.createTroopsChart(res['body']);
        this.createVehiclesChart(res['body']);
        this.createAirForcesChart(res['body']);

        this.LossesChartLoader = "CurrentLossesChartLoaderHidden";
      });
  }

  createTroopsChart(restData: any) {

    let datesArray = new Array();
    let pesonnelArray = new Array();
    
    this.aspectRatioValue = window.innerWidth < 1000 ? 1.5 : 3;
 
    for (let key in restData) {
      datesArray.push(restData[key]['date']);
      pesonnelArray.push(restData[key]['personnel']);
    }

    const troopsLabel: string = this.translate.instant('TOTALLOSSES.LINE_PERSONNEL');

    this.troopsChart = new Chart("TroopsLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: troopsLabel,
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

  createVehiclesChart(restData: any) {
    let datesArray = new Array();
    let tanksArray = new Array();
    let afvArray = new Array();
    let artilleryArray = new Array();
    let mlrsArray = new Array();
    let adfArray = new Array();
    let vehicles = new Array();
    let specialEquipment = new Array();

    for (let key in restData) {
      datesArray.push(restData[key]['date']);
      tanksArray.push(restData[key]['tanks']);
      afvArray.push(restData[key]['afv']);
      artilleryArray.push(restData[key]['artillery']);
      mlrsArray.push(restData[key]['mlrs']);
      adfArray.push(restData[key]['adf']);
      vehicles.push(restData[key]['vehicles']);
      specialEquipment.push(restData[key]['specialEquipment']);
    }

    const tanksLabel: string = this.translate.instant('TOTALLOSSES.LINE_TANKS');
    const afvLabel: string = this.translate.instant('TOTALLOSSES.LINE_AFV');
    const artilleryLabel: string = this.translate.instant('TOTALLOSSES.LINE_ARTILLERY');
    const mlrsLabel: string = this.translate.instant('TOTALLOSSES.LINE_MLRS');
    const adfLabel: string = this.translate.instant('TOTALLOSSES.LINE_ADF');
    const vehiclesLabel: string = this.translate.instant('TOTALLOSSES.LINE_VEHICLES');
    const specialEquipmentLabel: string = this.translate.instant('TOTALLOSSES.LINE_SPECIAL_EQUIPMENT');

    this.groundForcesChart = new Chart("GroundForcesLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: tanksLabel,
            data: tanksArray,
            backgroundColor: ChartProps.TanksChartBGColor,
            borderColor: ChartProps.TanksChartBorderColor
          },
          {
            label: afvLabel,
            data: afvArray,
            backgroundColor: ChartProps.AFVChartBGColor,
            borderColor: ChartProps.ADFChartBorderColor
          },
          {
            label: artilleryLabel,
            data: artilleryArray,
            backgroundColor: ChartProps.ArtilleryChartBGColor,
            borderColor: ChartProps.ArtilleryChartBorderColor
          },
          {
            label: mlrsLabel,
            data: mlrsArray,
            backgroundColor: ChartProps.MLRSChartBGColor,
            borderColor: ChartProps.MLRSChartBorderColor
          },
          {
            label: adfLabel,
            data: adfArray,
            backgroundColor: ChartProps.ADFChartBGColor,
            borderColor: ChartProps.ADFChartBorderColor
          },
          {
            label: vehiclesLabel,
            data: vehicles,
            backgroundColor: ChartProps.VehiclesChartBGColor,
            borderColor: ChartProps.VehiclesChartBorderColor
          },
          {
            label: specialEquipmentLabel,
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

  createAirForcesChart(restData: any) {
    let datesArray = new Array();
    let jetsArray = new Array();
    let helicoptersArray = new Array();
    let uavArray = new Array();
    let cruiseMissiles = new Array();
    let warShips = new Array();

    for (let key in restData) {
      datesArray.push(restData[key]['date']);     
      jetsArray.push(restData[key]['jets']);
      helicoptersArray.push(restData[key]['helicopters']);
      uavArray.push(restData[key]['uav']);
      cruiseMissiles.push(restData[key]['cruiseMissiles']);
      warShips.push(restData[key]['warShips']);
    }

    const jetsLabel: string = this.translate.instant('TOTALLOSSES.LINE_JETS');
    const helicoptersLabel: string = this.translate.instant('TOTALLOSSES.LINE_HELICOPTERS');
    const uavLabel: string = this.translate.instant('TOTALLOSSES.LINE_UAV');
    const cruiseMissilesLabel: string = this.translate.instant('TOTALLOSSES.LINE_CRUISE_MISSILES');
    const warShipsLabel: string = this.translate.instant('TOTALLOSSES.LINE_WAR_SHIPS');

    this.airForcesChart = new Chart("AirForcesLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: datesArray, 
	       datasets: [
          {
            label: jetsLabel,
            data: jetsArray,
            backgroundColor: ChartProps.JetsChartBGColor,
            borderColor: ChartProps.JetsChartBorderColor
          },
          {
            label: helicoptersLabel,
            data: helicoptersArray,
            backgroundColor: ChartProps.HelicoptersChartBGColor,
            borderColor: ChartProps.HelicoptersChartBorderColor
          },
          {
            label: uavLabel,
            data: uavArray,
            backgroundColor: ChartProps.UAVChartBGColor,
            borderColor: ChartProps.UAVChartBorderColor
          },
          {
            label: cruiseMissilesLabel,
            data: cruiseMissiles,
            backgroundColor: ChartProps.CruiseMissilesChartBGColor,
            borderColor: ChartProps.CruiseMissilesChartBorderColor
          },
          {
            label: warShipsLabel,
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
