import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TotalLossesComponent } from './total-losses/total-losses.component';
import { MonthlyLossesComponent } from './monthly-losses/monthly-losses.component';
import { SourcesComponent } from './sources/sources.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    TotalLossesComponent,
    MonthlyLossesComponent,
    SourcesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [ HttpClient ]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}