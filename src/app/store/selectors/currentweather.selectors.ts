import { createSelector, createFeatureSelector } from '@ngrx/store';
import { WeatherState } from '../reducers/currentweather.reducers';

export const selectWeatherState = createFeatureSelector<WeatherState>(
  'currentWeatherReducer'
);

export const selectAllWeatherData = createSelector(
  selectWeatherState,
  (state) => {
    return state;
  }
);

export const selectCity = createSelector(selectWeatherState, (state) => {
  return state.city;
});

export const selectTemperatureType = createSelector(
  selectWeatherState,
  (state) => {
    return state.temperatureType;
  }
);

export const selectSunsetData = createSelector(
  selectAllWeatherData,
  (state) => {
    if (state) {
      return state.weather.sys;
    }
  }
);

export const selectDayLength = createSelector(selectSunsetData, (state) => {
  if (state) {
    const sunrise = new Date(state.sunrise * 1000);
    const sunset = new Date(state.sunset * 1000);
    const timeDiff = sunset.getTime() - sunrise.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const dayLength = `${hours} h ${minutes} m`;

    return [sunrise, sunset, dayLength];
  } else {
    return [];
  }
});
