import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as ForecastActions from '../actions/forecast.actions';

@Injectable()
export class ForecastEffects {
  getForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForecastActions.getForecastData),

      exhaustMap((action) =>
        this.weatherService
          .getForecastWeather(action.city, action.temperatureType)
          .pipe(
            map((forecastData) => {
              return ForecastActions.getForecastDataSuccess({ forecastData });
            }),
            catchError((error) => {
              return EMPTY;
            })
          )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
