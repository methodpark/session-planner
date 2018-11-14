import { call, select, takeEvery } from 'redux-saga/effects';
import { NOTIFICATION_RECEIVED } from '../reducers/notifications';
import { toast } from '../../toast';

export function* watchPushNotification() {
  yield takeEvery(NOTIFICATION_RECEIVED, notifyUser);
}

export function* notifyUser(action) {
  const notifications = yield select(state => state.notifications);

  if (notifications.active) {
    const {title, body, ...options} = action;
    yield call(toast, title, body, options);
  }
}
