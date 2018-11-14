import { interceptRequest } from './requestInterceptor';
import { updateSessions } from './state/reducers/sessions';
import { NOTIFICATION_RECEIVED } from './state/reducers/notifications';

// Check for new sessions every 30 seconds
const PollTimeout = 30 * 1000;

function _handleData(store, sessions) {
  store.dispatch(updateSessions({sessions}));
}

function updateSessionData(store) {
  interceptRequest('/api/sessions', response => {
    if (response.status !== 200) {
      throw new Error('could not load sessions');
    }
    response.json()
      .then(result => _handleData(store, result))
      .catch(error => console.error(error.message));
  });
}

function pollSessionData(store) {
  updateSessionData(store);
  setTimeout(() => pollSessionData(store), PollTimeout);
}

export function initSessionData(store) {
  if (!navigator.serviceWorker) {
    console.log("No service worker support. Resort to polling.");

    pollSessionData(store);

    return;
  }

  updateSessionData(store);
  navigator.serviceWorker.addEventListener('message', event => {
    console.log("Received message from Service Worker: ", event.data);

    // check if we received an action -> dispatch to store
    if (event.data.type) {
      store.dispatch(event.data);
    }

    if (event.data.type === NOTIFICATION_RECEIVED) {
      // todo: move updateSessionData to saga?
      updateSessionData(store);
    }
  });
}
