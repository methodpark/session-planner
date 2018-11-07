import { createAction } from '../../../lib/util';

export const INIT_FAVORITES = 'INIT_FAVORITES';
export const SET_FAVORITE = 'SET_FAVORITE';
export const UNSET_FAVORITE = 'UNSET_FAVORITE';

export function initFavorites(favorites) {
  return createAction(INIT_FAVORITES, { favorites });
}

export function setFavorite(id) {
  return createAction(SET_FAVORITE, { id });
}

export function unsetFavorite(id) {
  return createAction(UNSET_FAVORITE, { id });
}

export function favoritesReducer(favorites = [], action) {
  switch (action.type) {
    case INIT_FAVORITES:
      return action.favorites || [];

    case SET_FAVORITE:
      return favorites.find(id => id === action.id) !== undefined
        ? favorites
        : [...favorites, action.id];

    case UNSET_FAVORITE:
      return favorites.filter(id => id !== action.id);

    default:
      return favorites;
  }
}