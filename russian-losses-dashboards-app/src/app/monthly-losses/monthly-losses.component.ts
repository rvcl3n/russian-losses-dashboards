import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartProps } from '../helpers/chart-props';
import { TranslateService } from '@ngx-translate/core';
import { RestLossesService } from '../rest-losses.service';

@Component({
  selector: 'app-monthly-losses',
  templateUrl: './monthly-losses.component.html',
  styleUrls: ['./monthly-losses.component.css']
})
export class MonthlyLossesComponent implements OnInit {

  public chart: any;

  barThickness: number = 30;

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
      this.chart.data.datasets[0].label = this.translate.instant('MONTHLY.LINE_PERSONNEL');
      this.chart.data.datasets[1].label = this.translate.instant('MONTHLY.LINE_TANKS');
      this.chart.data.datasets[2].label = this.translate.instant('MONTHLY.LINE_AFV');
      this.chart.data.datasets[3].label = this.translate.instant('MONTHLY.LINE_VEHICLES');
      this.chart.data.datasets[4].label = this.translate.instant('MONTHLY.LINE_ARTILLERY');

      this.chart.update();
    });
  }

  ngOnInit(): void {
    this.restLossesService.getTotalLosses().subscribe(res => 
      {
        this.createChart(res['body']);
      });
  }

  createChart(data: any){
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

    const troopsLabel: string = this.translate.instant('MONTHLY.LINE_PERSONNEL');
    const tanksLabel: string = this.translate.instant('MONTHLY.LINE_TANKS');
    const afvLabel: string = this.translate.instant('MONTHLY.LINE_AFV');
    const vehiclesLabel: string = this.translate.instant('MONTHLY.LINE_VEHICLES');
    const artilleryLabel: string = this.translate.instant('MONTHLY.LINE_ARTILLERY');

    this.chart = new Chart("LossesChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Array.from(troopsMap.keys()), 
	       datasets: [
          {
            label: troopsLabel,
            data: Array.from(troopsMap.values()),
            backgroundColor: ChartProps.PersonnelBGColor,
            barThickness : this.barThickness
          },
          {
            label: tanksLabel,
            data: Array.from(tanksMap.values()),
            backgroundColor: ChartProps.TanksChartBGColor,
            barThickness : this.barThickness
          },
          {
            label: afvLabel,
            data: Array.from(afvMap.values()),
            backgroundColor: ChartProps.AFVChartBGColor,
            barThickness : this.barThickness
          },
          {
            label: vehiclesLabel,
            data: Array.from(vehiclesMap.values()),
            backgroundColor: ChartProps.VehiclesChartBGColor,
            barThickness : this.barThickness
          },
          {
            label: artilleryLabel,
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
