import { createAction, props } from '@ngrx/store';

// Hakee nykyisen säätilan
export const getWeatherData = createAction(
  '[WeatherData] Get Current weather',
  props<{ city: string }>()
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
