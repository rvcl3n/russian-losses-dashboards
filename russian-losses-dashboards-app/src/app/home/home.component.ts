import { Component, OnInit } from '@angular/core';
import data from '../../../../russian-losses.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public personnel: number;
  public tanks: number;
  public afv: number;
  public artillery: number;
  public mlrs: number;
  public adf: number;
  public jets: number;
  public helicopters: number;
  public uav: number;
  public cruiseMissiles: number;
  public warShips: number;
  public vehicles: number;
  public specialEquipment: number;

  constructor(){
    this.personnel = 0;
    this.tanks = 0;
    this.afv = 0;
    this.artillery = 0;
    this.mlrs = 0;
    this.adf = 0;
    this.jets = 0;
    this.helicopters = 0;
    this.uav = 0;
    this.cruiseMissiles = 0;
    this.warShips = 0;
    this.vehicles = 0;
    this.specialEquipment = 0;
  }

  ngOnInit(): void {
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
    this.specialEquipment =  data[data.length - 1]['specialEquipment'];
  }
}
