import { createAction, props } from '@ngrx/store';

// Hakee nykyisen säätilan
export const getWeatherData = createAction(
  '[WeatherData] Get Current weather',
  props<{ city: string; temperatureType: string }>()
);

// Kun nykyinen säätila on haettu onnistuneesti
export const getWeatherDataSuccess = createAction(
  '[Weather] Get current Weather Success',
  props<{ weatherData: any }>()
);

// Jos nykyisen säätilan haku epäonnistuu
export const getWeatherDataFailure = createAction(
  '[Weather] Get Current Weather Failure',
  props<{ error: any }>()
);

// Action, jolla asetetaan lämpötilayksikön arvo
export const setTemperatureType = createAction(
  '[Weather] Set Temperature Type',
  props<{ temperatureType: string }>()
);

// Action, jolla asetetaan city value
export const setCityValue = createAction(
  '[Weather] Set City Value',
  props<{ cityValue: string }>()
);
