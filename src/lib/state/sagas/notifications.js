import { call, fork, join, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import {
  TOGGLE_NOTIFICATIONS,
  SESSION_START_NOTIFICATION,
  FETCH_SESSIONS
} from '../reducers/notifications';
import {   UPDATE_SINGLE_SESSION } from '../reducers/sessions';
import { updateSessions } from '../reducers/sessions';
import { storeNotificationSettings } from '../../localStorage';
import { toast } from '../../toast';
import { disregardDate } from '../../util';

const TimeForNotificationInMinutes = 10;

export function* watchPushNotification() {
  yield takeEvery(UPDATE_SINGLE_SESSION, notifyUser);
  yield takeLatest(TOGGLE_NOTIFICATIONS, toggleNotifications);
  yield takeLatest(FETCH_SESSIONS, fetchSessions);
  yield takeLatest(SESSION_START_NOTIFICATION, notifyUserOfSessionStart);
}

export function* notifyUser(action) {
  const notifications = yield select(state => state.notifications);
  const favorites = yield select(state => state.favorites);

  const { session } = action.change;
  const sessionIsFavorite = favorites.find(i => i === session.id) !== undefined;

  if (notifications.active && sessionIsFavorite) {
    const title = 'A session you liked was updated'
    const body = `${session.title} was updated.`;
    const options = { icon: '/logo/logo192x192.png' };

    yield call(toast, title, body, options);
  }
}

export function* notifyUserOfSessionStart(action) {
  const favoriteSessions = yield select(state => {
    const {favorites, sessions} = state;
    return favorites
      .map(index => sessions[index])
      .filter(s => s !== undefined);
  });
  const now = moment(action.timestamp);

  const favoriteSessionsAboutToStart = favoriteSessions.filter(({ start }) => {
    const tenMinutesBeforeStart = moment(start).subtract(TimeForNotificationInMinutes, 'minutes');
    return now.isBetween(disregardDate(tenMinutesBeforeStart), disregardDate(start));
  });

  if (favoriteSessionsAboutToStart.length > 0) {
    const isOnlyOne = favoriteSessionsAboutToStart.length === 1;
    let title = `${favoriteSessionsAboutToStart.length} sessions you liked are about to start`;
    if (isOnlyOne) {
      title = `${favoriteSessionsAboutToStart.length} session you liked is about to start`;
    }

    const body = favoriteSessionsAboutToStart.map(s => `${s.title} - ${s.room}`).join('\n');
    const options = {icon: '/logo/logo192x192.png'};

    yield call(toast, title, body, options);
  }

}

export function* toggleNotifications() {
  const settings = yield select(state => state.notifications);
  yield call(storeNotificationSettings, settings);
}

function* handleResponse(response) {
  if (response.status !== 200) {
    throw new Error('could not load sessions');
  }

  return yield call([response, response.json]);
}

function* loadFromServer(url) {
  try {
    const response = yield call(fetch, url);
    const sessions = yield handleResponse(response);

    yield put(updateSessions({sessions}));
  } catch(e) {
    console.warn(e);
    return false;
  }

  return true;
}

function searchCache(url) {
  return window.caches.match(url);
}

function* loadFromCache(url, fetchTask) {
  try {
    const cachesExist = 'caches' in window;
    if (!cachesExist) {
      throw new Error('No cache');
    }

    const response = yield call(searchCache, url);
    if (!response) {
      throw new Error('No data');
    }

    const sessions = yield handleResponse(response);

    const fetchWasSuccessful = fetchTask.result();
    if (fetchTask.isRunning() || !fetchWasSuccessful) {
      yield put(updateSessions({ sessions }));
    }
  }
  catch (e) {
    console.warn(e);
  }
}

export function* fetchSessions() {
  const url = '/api/sessions';

  let fetchFromServerTask;
  try {
    fetchFromServerTask = yield fork(loadFromServer, url);
  } catch (e) {
     console.log('ERROR(fetch):', e);
  }

  let loadFromCacheTask;
  try {
    loadFromCacheTask = yield fork(loadFromCache, url, fetchFromServerTask);
  } catch (e) {
    console.log('ERROR(cache):', e);
  }

  yield join(fetchFromServerTask, loadFromCacheTask);
}