import { createReducer, on } from '@ngrx/store';
import * as AirPollutionActions from '../actions/airpollution.actions';

export interface AirPollutionState {
  airpollution: any;
  selectedAirComponents: any;
  chartType: string;
}

const initialState: AirPollutionState = {
  airpollution: {
    coord: [],
    list: [],
  },
  selectedAirComponents: {
    co: true,
    no: true,
    no2: true,
    o3: true,
    so2: true,
    pm2_5: true,
    pm10: true,
    nh3: true,
  },
  chartType: 'Bar',
};

export const airPollutionReducer = createReducer(
  initialState,
  on(AirPollutionActions.getAirPollutionSuccess, (state, { AirPollution }) => {
    return { ...state, airpollution: AirPollution };
  }),

  on(
    AirPollutionActions.setSelectedAirComponents,
    (state, { SelectedAirComponents }) => {
      return { ...state, selectedAirComponents: SelectedAirComponents };
    }
  ),

  on(AirPollutionActions.setChartType, (state, { ChartType }) => {
    return { ...state, chartType: ChartType };
  })
);
