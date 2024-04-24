import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as AirPollutionActions from '../actions/airpollution.actions';

@Injectable()
export class AirPollutionEffects {
  getAirPollution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AirPollutionActions.getAirPollution),

      exhaustMap((action) =>
        this.weatherService.getAirPollution(action.city).pipe(
          map((AirPollution) => {
            return AirPollutionActions.getAirPollutionSuccess({ AirPollution });
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
