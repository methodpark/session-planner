import { createAction } from '../../lib/util';

export const SET_FAVORITES_FILTER = 'SET_FAVORITES_FILTER';

export function setFavoritesFilter(activeState) {
  return createAction(SET_FAVORITES_FILTER, { activeState });
}

export function filtersReducer(filters = {onlyFavorites: false}, action) {
  switch (action.type) {
    case SET_FAVORITES_FILTER:
      return { ...filters, onlyFavorites: action.activeState };
    default:
      return filters;
  }
}