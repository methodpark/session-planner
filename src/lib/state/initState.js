import { loadFavorites, loadTheme, loadNotificationSettings } from '../localStorage';
import { initPrompt } from './reducers/prompt';
import { initFavorites } from './reducers/favorites';
import { initTheme } from './reducers/theme';
import { setNotificationSettings } from './reducers/notifications';

export function initializeStateFromLocalStorage(store) {
  const theme = loadTheme();
  const htmlElement = document.getElementsByTagName('html')[0];
  htmlElement.setAttribute('theme', theme.name);
  store.dispatch(initTheme(theme));

  const favorites = loadFavorites();
  store.dispatch(initFavorites(favorites));

  const notificationSettings = loadNotificationSettings();
  store.dispatch(setNotificationSettings(notificationSettings));

  store.dispatch(initPrompt());
}