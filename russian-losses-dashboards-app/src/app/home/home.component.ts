import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartProps } from '../helpers/chart-props';
import { TranslateService } from '@ngx-translate/core';
import { RestLossesService } from '../rest-losses.service';

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

  public dashTitle: string;

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
      this.currentLossesChart.data.datasets[0].label = this.translate.instant('HOME.INFO_PERSONNEL');
      this.currentLossesChart.data.datasets[0].data = this.pesonnelArray;
      this.currentLossesChart.data.datasets[0].backgroundColor =  ChartProps.PersonnelBGColor;
      this.currentLossesChart.data.datasets[0].borderColor =  ChartProps.PersonnelBorderColor;
      this.currentLossesChart.update();
    });
  }


  ngOnInit(): void {
    this.restLossesService.getTotalLosses().subscribe(res => 
      {
        this.loadLossesForCurrentDay(res['body']);
        this.createTroopsChart(res['body']);
        //this.createVehiclesChart(res['body']);
        //this.createAirForcesChart(res['body']);
      });

    
  }

  loadLossesForCurrentDay(data: any)
  {
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
  }

  createTroopsChart(data: any) {
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

    const chartLabel: string = this.translate.instant('HOME.INFO_PERSONNEL');

    this.currentLossesChart = new Chart("CurrentLossesChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.datesArray, 
	       datasets: [
          {
            label: chartLabel,
            data: this.pesonnelArray,
            backgroundColor: ChartProps.PersonnelBGColor,
            borderColor: ChartProps.PersonnelBorderColor
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

    let translationVal: string = '';

    switch(lossesType)
    {
      case "Personnel": {
        this.currentLossesChart.data.datasets[0].data = this.pesonnelArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.PersonnelBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.PersonnelBorderColor;
        translationVal = ChartProps.PersonnelTranslationTitle;
        break;
      }
      case "Tanks": {
        this.currentLossesChart.data.datasets[0].data = this.tanksArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.TanksChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.TanksChartBorderColor;
        translationVal = ChartProps.TanksTranslationTitle;
        break;
      }
      case "AFV": {
        this.currentLossesChart.data.datasets[0].data = this.afvArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.AFVChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.AFVChartBorderColor;
        translationVal = ChartProps.AFVTranslationTitle;
        break;
      }
      case "Artillery": {
        this.currentLossesChart.data.datasets[0].data = this.artilleryArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.ArtilleryChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.ArtilleryChartBorderColor;
        translationVal = ChartProps.ArtilleryTranslationTitle;
        break;
      }
      case "MLRS": {
        this.currentLossesChart.data.datasets[0].data = this.mlrsArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.MLRSChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.MLRSChartBorderColor;
        translationVal = ChartProps.MLRSTranslationTitle;
        break;
      }
      case "ADF": {
        this.currentLossesChart.data.datasets[0].data = this.adfArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.ADFChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.ADFChartBorderColor;
        translationVal = ChartProps.ADFTranslationTitle;
        break;
      }
      case "Jets": {
        this.currentLossesChart.data.datasets[0].data = this.jetsArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.JetsChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.JetsChartBorderColor;
        translationVal = ChartProps.JetsTranslationTitle;
        break;
      }
      case "Helicopters": {
        this.currentLossesChart.data.datasets[0].data = this.helicoptersArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.HelicoptersChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.HelicoptersChartBorderColor;
        translationVal = ChartProps.HelicoptersTranslationTitle;
        break;
      }
      case "UAV": {
        this.currentLossesChart.data.datasets[0].data = this.uavArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.UAVChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.UAVChartBorderColor;
        translationVal = ChartProps.UAVTranslationTitle;
        break;
      }
      case "Cruise Missiles": {
        this.currentLossesChart.data.datasets[0].data = this.cruiseMissilesArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.CruiseMissilesChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.CruiseMissilesChartBorderColor;
        translationVal = ChartProps.CruiseMissilesTranslationTitle;
        break;
      }
      case "War Ships": {
        this.currentLossesChart.data.datasets[0].data = this.warShipsArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.WarShipsChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.WarShipsChartBorderColor;
        translationVal = ChartProps.WarShipsTranslationTitle;
        break;
      }
      case "Vehicles": {
        this.currentLossesChart.data.datasets[0].data = this.vehiclesArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.VehiclesChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.VehiclesChartBorderColor;
        translationVal = ChartProps.VehiclesTranslationTitle;
        break;
      }
      case "Special Equipment": {
        this.currentLossesChart.data.datasets[0].data = this.specialEquipmentArray;
        this.currentLossesChart.data.datasets[0].backgroundColor = ChartProps.SpecialEquipmentChartBGColor;
        this.currentLossesChart.data.datasets[0].borderColor = ChartProps.SpecialEquipmentChartBorderColor;
        translationVal = ChartProps.SpecialEquipmentTranslationTitle;
        break;
      }
      default: {
        console.log('Chart error: wrong losses type');
        break;
      }
    }

    let header = this.translate.instant("HOME.INFO_" + translationVal);

    this.currentLossesChart.data.datasets[0].label =  header;
    
    this.currentLossesChart.update();
  }
}
