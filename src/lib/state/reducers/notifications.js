import { createAction } from '../../../lib/util';

export const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS';
export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const SESSION_START_NOTIFICATION = 'SESSION_START_NOTIFICATION';

export function toggleNotifications() {
  return createAction(TOGGLE_NOTIFICATIONS);
}

export function receivedPushNotification(payload) {
  return { ...payload, type: NOTIFICATION_RECEIVED };
}

export function setNotificationSettings(settings) {
  return { type: SET_NOTIFICATIONS, settings};
}

export function fetchSessions() {
  return { type: FETCH_SESSIONS };
}

export function notificationsReducer(notifications = {
  active: false
}, action) {
  const { active } = notifications;

  switch (action.type) {
    case TOGGLE_NOTIFICATIONS:
      return { ...notifications, active: !active };
    case SET_NOTIFICATIONS:
      return { ...notifications, ...action.settings };
    default:
      return notifications;
  }
}