import { createAction } from '../../util';

export const SET_THEME = 'SET_THEME';
export const INIT_THEME = 'INIT_THEME';

export function initTheme(theme) {
  return createAction(INIT_THEME, { theme });
}

export function setLightTheme() {
  return createAction(SET_THEME, { name: 'light'});
}

export function setDarkTheme() {
  return createAction(SET_THEME, { name: 'dark' });
}

export function themeReducer(themeSettings = {}, action) {
  switch (action.type) {
    case INIT_THEME:
      if(action.theme.name) {
        return { ...themeSettings, name: action.theme.name };
      }
      return { name: 'light' };

    case SET_THEME:
      return { ...themeSettings, name: action.name}

    default:
      return themeSettings;
  }
}