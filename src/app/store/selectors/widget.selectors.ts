import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetState, initialState } from '../reducers/widget.reducers';

const selectWidgetState = createFeatureSelector<WidgetState>('widgetReducer');

export const selectWidgets = createSelector(selectWidgetState, (state: any) => {
  return state;
});

export const selectInitial = () => {
  return initialState;
};
