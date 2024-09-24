import { createReducer, on } from '@ngrx/store';
import * as forecastActions from '../actions/forecast.actions';

export interface ForecastState {
  forecast: any;
  forecastType: any;
}

const initialState: ForecastState = {
  forecast: {},
  forecastType: 'fiveDays',
};

export const forecastReducer = createReducer(
  initialState,
  on(forecastActions.getForecastDataSuccess, (state, { forecastData }) => {
    return { ...state, forecast: forecastData };
  }),

  on(forecastActions.getForecastData, (state) => {
    return { ...state };
  }),

  on(forecastActions.setForecastType, (state, { forecastType }) => {
    return { ...state, forecastType: forecastType };
  })
);
