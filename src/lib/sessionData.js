import { updateSessions } from './state/state';
import { interceptRequest } from './requestInterceptor';
import { UPDATE_SESSION_DATA } from './workerMessages';

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

export function initSessionData(store) {
  updateSessionData(store);

  if (!navigator.serviceWorker) {
    console.log("No service worker support.");
    return;
  }

  navigator.serviceWorker.addEventListener('message', event => {
    console.log("Received message from Service Worker: ", event.data);
    if (event.data.type === UPDATE_SESSION_DATA) {
      updateSessionData(store);
    }
  });
}
