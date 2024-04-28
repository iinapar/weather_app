import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirPollutionComponent } from './dashboard/widgets/air-pollution/air-pollution.component';
import { CurrentWeatherComponent } from './dashboard/widgets/current-weather/current-weather.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MaterialModule } from './shared/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { EffectsModule } from '@ngrx/effects';
import { widgetReducer } from './store/reducers/widget.reducers';
import { currentWeatherReducer } from './store/reducers/currentweather.reducers';
import { airPollutionReducer } from './store/reducers/airpollution.reducers';

import { CurrentWeatherEffects } from './store/effects/currentweather.effects';
import { AirPollutionEffects } from './store/effects/airpollution.effects';
import { DayLengthComponent } from './dashboard/widgets/day-length/day-length.component';
import { AirPollutionSettingsDialogComponent } from './dashboard/widgets/air-pollution/air-pollution-settings-dialog/air-pollution-settings-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardContainerComponent } from './dashboard/dashboard.container';

@NgModule({
  declarations: [
    AppComponent,
    AirPollutionComponent,
    CurrentWeatherComponent,
    DayLengthComponent,
    AirPollutionSettingsDialogComponent,
    DashboardComponent,
    DashboardContainerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    NgxChartsModule,
    StoreModule.forRoot(
      {
        widgetReducer: widgetReducer,
        currentWeatherReducer: currentWeatherReducer,
        airPollutionReducer: airPollutionReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([AirPollutionEffects, CurrentWeatherEffects]),
    HttpClientModule,
  ],
  providers: [provideAnimationsAsync(), HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
