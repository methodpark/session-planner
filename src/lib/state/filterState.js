import { createAction } from '../../lib/util';

export const SET_FAVORITES_FILTER = 'SET_FAVORITES_FILTER';
export const SET_ONLY_IN_FUTURE_FILTER = 'SET_ONLY_IN_FUTURE_FILTER';

export function setFavoritesFilter(activeState) {
  return createAction(SET_FAVORITES_FILTER, { activeState });
}
export function setOnlyInFutureFilter(activeState) {
  return createAction(SET_ONLY_IN_FUTURE_FILTER, { activeState });
}

export function filtersReducer(filters = {
  onlyFavorites: false,
  onlyInFuture: false
}, action) {
  switch (action.type) {
    case SET_FAVORITES_FILTER:
      return { ...filters, onlyFavorites: action.activeState };
    case SET_ONLY_IN_FUTURE_FILTER:
      return { ...filters, onlyInFuture: action.activeState };
    default:
      return filters;
  }
}