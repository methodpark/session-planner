import { select, takeLatest } from 'redux-saga/effects';

import { SET_FAVORITE, UNSET_FAVORITE } from '../state';
import { storeFavorites } from '../../localStorage';

export function* watchFavorites() {
  yield takeLatest([SET_FAVORITE, UNSET_FAVORITE], handleFavoriteChange);
}

function* handleFavoriteChange() {
  const favorites = yield select(state => state.favorites);
  storeFavorites(favorites);
}
