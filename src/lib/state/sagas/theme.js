import { select, takeLatest } from 'redux-saga/effects';

import { SET_THEME } from '../reducers/theme';
import { storeTheme } from '../../localStorage';

export function* watchTheme() {
  yield takeLatest([SET_THEME], handleThemeChange);
}

function* handleThemeChange() {
  const theme = yield select(state => state.theme);

  console.log(theme);
  const htmlElement = document.getElementsByTagName('html')[0];
  htmlElement.setAttribute('theme', theme.name)

  storeTheme(theme);
}
