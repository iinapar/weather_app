import { createAction, props } from '@ngrx/store';

// Hakee tämänhetkiset ilmansaaste-tiedot
export const getAirPollution = createAction(
  '[AirPollution] Get Air Pollution',
  props<{ city: any }>()
);

// Kun ilmansaaste-tiedot on haettu onnistuneesti
export const getAirPollutionSuccess = createAction(
  '[AirPollution] Get Air Pollution Success',
  props<{ AirPollution: any }>()
);

// Jos ilmansaaste-tietojen haku epäonnistuu
export const getAirPollutionFailure = createAction(
  '[AirPollution] Get AirPollution Failure',
  props<{ error: any }>()
);

export const resetAirPollution = createAction(
  '[AirPollution] Reset AirPollution'
);

// Action jolla valitaan halutut komponentit kaavioon
export const setSelectedAirComponents = createAction(
  '[AirPollution] Select air components',
  props<{ SelectedAirComponents: any }>()
);

// Action, jolla asetetaan chartType arvo
export const setChartType = createAction(
  '[AirPollution] Set Chart Type',
  props<{ ChartType: string }>()
);
