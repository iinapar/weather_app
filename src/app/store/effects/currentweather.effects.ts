import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as WeatherActions from '../actions/currentweather.actions';

@Injectable()
export class CurrentWeatherEffects {
  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getWeatherData),

      exhaustMap((action) =>
        this.weatherService.getCurrentWeather(action.city).pipe(
          map((weatherData) => {
            return WeatherActions.getWeatherDataSuccess({ weatherData });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
