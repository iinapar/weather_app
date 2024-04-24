import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/currentweather.actions';

export interface WeatherState {
  weather: any;
  city: any;
}

const initialState: WeatherState = {
  weather: {},
  city: 'Jyväskylä',
};

export const currentWeatherReducer = createReducer(
  initialState,
  on(WeatherActions.getWeatherDataSuccess, (state, { weatherData }) => {
    return { ...state, weather: weatherData };
  }),

  on(WeatherActions.getWeatherData, (state, { city }) => {
    return { ...state, city: city };
  })
);
