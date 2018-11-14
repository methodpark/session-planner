import { createAction } from '../../../lib/util';

export const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS';
export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';

export function toggleNotifications() {
  return createAction(TOGGLE_NOTIFICATIONS);
}

export function receivedPushNotification(payload) {
  return { ...payload, type: NOTIFICATION_RECEIVED };
}

export function notificationsReducer(notifications = {
  active: false
}, action) {
  const { active } = notifications;

  switch (action.type) {
    case TOGGLE_NOTIFICATIONS:
      return { ...notifications, active: !active };
    default:
      return notifications;
  }
}