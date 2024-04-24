import { createAction, props } from '@ngrx/store';

// Hakee widgetit
export const getWidgets = createAction('[Widget] Select Widgets');

// Päivittää widgetit
export const updateWidget = createAction(
  '[Widget] Update Widget',
  props<{ id: number; x: number; y: number; h: number; w: number }>()
);

// Palauttaa widgetit alkutilaan
export const resetWidgets = createAction('[Widget] Reset Widgets');
