import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/currentweather.actions';

export interface WeatherState {
  weather: any;
  city: any;
  temperatureType: string;
}

const initialState: WeatherState = {
  weather: {},
  city: 'Jyväskylä',
  temperatureType: 'metric',
};

export const currentWeatherReducer = createReducer(
  initialState,
  on(WeatherActions.getWeatherDataSuccess, (state, { weatherData }) => {
    return { ...state, weather: weatherData };
  }),

  on(WeatherActions.getWeatherData, (state, { city }) => {
    return { ...state, city: city };
  }),

  on(WeatherActions.setTemperatureType, (state, { temperatureType }) => {
    return { ...state, temperatureType: temperatureType };
  }),

  on(WeatherActions.setCityValue, (state, { cityValue }) => {
    return { ...state, city: cityValue };
  })
);
