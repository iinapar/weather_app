import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ForecastState } from '../reducers/forecast.reducers';

export const selectForecastState =
  createFeatureSelector<ForecastState>('forecastReducer');

export const selectAllForecastData = createSelector(
  selectForecastState,
  (state) => {
    return state;
  }
);

export const selectForecastType = createSelector(
  selectForecastState,
  (state) => {
    return state.forecastType;
  }
);

export const selectForecastList = createSelector(
  selectForecastState,
  (state) => {
    return state.forecast.list;
  }
);

export const selectForecastDataGroupedByDays = createSelector(
  selectForecastList,
  (state) => {
    if (state) {
      const groups: { [key: string]: any[] } = {};
      let forecastGroups = [];
      for (const forecast of state) {
        const date = new Date(forecast.dt * 1000);
        const day = date.toDateString();

        if (!groups[day]) {
          groups[day] = [];
        }
        groups[day].push(forecast);
      }
      forecastGroups = Object.keys(groups).map((day) => ({
        day,
        forecasts: groups[day],
      }));
      return forecastGroups;
    }
    return [];
  }
);

export const selectForecastForChart = createSelector(
  selectForecastDataGroupedByDays,
  (state) => {
    if (state) {
      let series: any = [];
      state.forEach((data: any) => {
        data.forecasts.forEach((x: any) => {
          let y = { value: x.main.temp, name: x.dt_txt };
          series.push(y);
        });
      });

      let chartData = [{ name: 'Temperature', series: series }];
      return chartData;
    }
    return [];
  }
);

export const selectForecastForNext24Hours = createSelector(
  selectForecastDataGroupedByDays,
  (state) => {
    if (state) {
      const now = new Date().getTime();
      const endTime = now + 24 * 60 * 60 * 1000;

      let series: any = [];
      state.forEach((data: any) => {
        data.forecasts.forEach((x: any) => {
          const forecastTime = new Date(x.dt_txt).getTime();
          if (forecastTime <= endTime) {
            let y = { value: x.main.temp, name: x.dt_txt };
            series.push(y);
          }
        });
      });

      let chartData = [{ name: 'Temperature', series: series }];
      return chartData;
    }
    return [];
  }
);
