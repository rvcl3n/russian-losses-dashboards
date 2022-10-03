import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TotalLossesComponent } from '../total-losses/total-losses.component';
import { MonthlyLossesComponent } from '../monthly-losses/monthly-losses.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'totallosses', component: TotalLossesComponent},
  { path: 'monthlylosses', component: MonthlyLossesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class RoutingModule { }