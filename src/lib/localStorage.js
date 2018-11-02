const FAVORITES = 'favorites';

export function loadFavorites() {
  const loadedJson = localStorage.getItem(FAVORITES);
  return loadedJson ? JSON.parse(loadedJson) : [];
}

export function storeFavorites(favorites) {
  localStorage.setItem(FAVORITES, JSON.stringify(favorites));
}
