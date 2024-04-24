import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AirPollutionState } from '../reducers/airpollution.reducers';

export const selectAirPollutionState = createFeatureSelector<AirPollutionState>(
  'airPollutionReducer'
);

export const selectAirPollution = createSelector(
  selectAirPollutionState,
  (state) => {
    return state.airpollution.list;
  }
);

export const selectChartType = createSelector(
  selectAirPollutionState,
  (state) => {
    return state.chartType;
  }
);

export const selectAirPollutionComponents = createSelector(
  selectAirPollution,
  (list) => {
    if (!list || list.length === 0) {
      return [];
    }

    const componentsArray = list.reduce((acc: any, item: any) => {
      const components = item.components;
      const componentNames = Object.keys(components);
      const componentValues = componentNames.map((name) => ({
        name,
        value: components[name],
      }));

      return [...acc, ...componentValues];
    }, []);

    return componentsArray;
  }
);

export const selectFilteredAirPollutionComponents = createSelector(
  selectAirPollutionState,
  selectAirPollutionComponents,

  (state, components) => {
    let selectedAirComponentsForChart: any[] = [];
    const selectedKeys = Object.entries(state.selectedAirComponents)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    components.forEach((component: any) => {
      if (selectedKeys.includes(component.name)) {
        selectedAirComponentsForChart.push(component);
      }
    });
    return selectedAirComponentsForChart;
  }
);

export const selectAirComponents = createSelector(
  selectAirPollutionState,
  (state) => {
    return state.selectedAirComponents;
  }
);
