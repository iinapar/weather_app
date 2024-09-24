// widget.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as WidgetActions from '../actions/widget.actions';

export interface WidgetState {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const initialState: WidgetState[] = [
  {
    id: 1,
    x: 0,
    y: 0,
    w: 2,
    h: 2,
  },
  {
    id: 2,
    x: 2,
    y: 0,
    w: 6,
    h: 4,
  },
  {
    id: 3,
    x: 0,
    y: 2,
    w: 2,
    h: 2,
  },
  {
    id: 4,
    x: 8,
    y: 0,
    w: 4,
    h: 4,
  },
];

export const widgetReducer = createReducer(
  initialState,
  on(WidgetActions.getWidgets, (state) => {
    return {
      ...state,
    };
  }),

  on(WidgetActions.updateWidget, (state, { id, x, y, h, w }) => {
    const widgetIndex = state.findIndex((widget) => widget.id === id);
    if (widgetIndex !== -1) {
      const updatedWidget = { ...state[widgetIndex], x, y, h, w };
      return [
        ...state.slice(0, widgetIndex),
        updatedWidget,
        ...state.slice(widgetIndex + 1),
      ];
    }
    return state;
  }),

  on(WidgetActions.resetWidgets, () => {
    return initialState;
  })
);
