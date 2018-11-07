import { select, takeLatest, put } from 'redux-saga/effects';

import { SET_FAVORITE, UNSET_FAVORITE } from '../state';
import { storeFavorites } from '../../localStorage';
import { setFavoritesFilter } from '../filterState';

export function* watchFavorites() {
  yield takeLatest([SET_FAVORITE, UNSET_FAVORITE], handleFavoriteChange);
}

function* handleFavoriteChange() {
  const favorites = yield select(state => state.favorites);

  if(favorites.length === 0){
    yield put(setFavoritesFilter(false));
  }

  storeFavorites(favorites);
}
