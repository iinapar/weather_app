import { createAction, props } from '@ngrx/store';

// Hakee nykyisen säätilan
export const getForecastData = createAction(
  '[Forecast] Get Forecast weather',
  props<{ city: string; temperatureType: string }>()
);

// Kun nykyinen säätila on haettu onnistuneesti
export const getForecastDataSuccess = createAction(
  '[Forecast] Get  Forecast Success',
  props<{ forecastData: any }>()
);

// Jos nykyisen säätilan haku epäonnistuu
export const getForecastDataFailure = createAction(
  '[Forecast] Get Forecast Failure',
  props<{ error: any }>()
);

// Action, jolla asetetaan chartType arvo
export const setForecastType = createAction(
  '[Forecast] Set Forecast Type',
  props<{ forecastType: string }>()
);
