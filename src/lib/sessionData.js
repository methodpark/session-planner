import { fetchSessions } from './state/reducers/notifications';

// Check for new sessions every 30 seconds
const PollTimeout = 30 * 1000;

function pollSessionData(store) {
  store.dispatch(fetchSessions());
  setTimeout(() => pollSessionData(store), PollTimeout);
}

export function initSessionData(store) {
  if (!navigator.serviceWorker) {
    console.log("No service worker support. Resort to polling.");

    pollSessionData(store);
    return;
  }

  store.dispatch(fetchSessions());

  // TODO: move this somewhere else
  navigator.serviceWorker.addEventListener('message', event => {
    console.log("Received message from Service Worker: ", event.data);

    // check if we received an action -> dispatch to store
    if (event.data.type) {
      store.dispatch(event.data);
    }

    store.dispatch(fetchSessions());
  });
}
