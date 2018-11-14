import { call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  NOTIFICATION_RECEIVED,
  TOGGLE_NOTIFICATIONS
} from '../reducers/notifications';
import { storeNotificationSettings } from '../../localStorage';
import { toast } from '../../toast';

export function* watchPushNotification() {
  yield takeEvery(NOTIFICATION_RECEIVED, notifyUser);
  yield takeLatest(TOGGLE_NOTIFICATIONS, toggleNotifications);
}

export function* notifyUser(action) {
  const notifications = yield select(state => state.notifications);

  if (notifications.active) {
    const {title, body, ...options} = action;
    yield call(toast, title, body, options);
  }
}

export function* toggleNotifications() {
  const settings = yield select(state => state.notifications);
  yield call(storeNotificationSettings, settings);
}
