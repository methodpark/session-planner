const FAVORITES = 'favorites';
const PROMPT = 'prompt';
const THEME = 'theme';
const NOTIFICATIONS = 'notifications';

export function load(what, fallback = []) {
  const loadedJson = localStorage.getItem(what);
  return loadedJson ? JSON.parse(loadedJson) : fallback;
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

export function storeNotificationSettings(settings) {
  localStorage.setItem(NOTIFICATIONS, JSON.stringify(settings));
}

export function loadNotificationSettings() {
  return load(NOTIFICATIONS);
}

export function storeTheme(theme) {
  localStorage.setItem(THEME, JSON.stringify(theme));
}

export function loadTheme() {
  return load(THEME, {});
}