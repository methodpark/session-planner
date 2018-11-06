const FAVORITES = 'favorites';
const PROMPT = 'prompt';

export function load(what) {
  const loadedJson = localStorage.getItem(what);
  return loadedJson ? JSON.parse(loadedJson) : [];
}

export function loadFavorites() {
  return load(FAVORITES);
}

export function storeFavorites(favorites) {
  localStorage.setItem(FAVORITES, JSON.stringify(favorites));
}

export function storePrompt(status) {
  localStorage.setItem(PROMPT, JSON.stringify(status));
}

export function loadPrompt() {
  return load(PROMPT);
}