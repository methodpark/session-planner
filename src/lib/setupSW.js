import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import publicKeyJson from '../vapid-keys.public.json'

let publicKey = publicKeyJson.publicKey;

export default async function setupSW() {

  if (!navigator.serviceWorker) {
    console.log("No service worker support.");
    return;
  }

  const registration = await runtime.register();
  try {
    console.log('Registering for notifications');
    await registerSubscription(registration);
  } catch (e) {
    console.log('Registering failed:', e);
    const existingSubscription = await registration.pushManager.getSubscription();
    console.log('The existing subscription is: ', existingSubscription);

    if (existingSubscription != null) {
      console.log('Registering subscription failed. Found an existing subscription -- unsubscribing first.')
      existingSubscription.unsubscribe();

      try {
        console.log('Trying to re-reqister...', publicKey);
        await registerSubscription(registration);
        console.log('Re-Registering successful');
      } catch(e) {
        console.log('Re-registering failed, because reasons.', e);
      }
    }
  }
}

async function registerSubscription(registration) {
  console.log('===== asking for permission');
  await askPermission();

  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  };

  console.log('===== sending subscription request');
  const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);

  console.log('===== Received PushSubscription: ', JSON.stringify(pushSubscription));
  return sendSubscriptionToBackEnd(pushSubscription);
}

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(result => resolve(result));

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function (permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
}

async function sendSubscriptionToBackEnd(subscription) {
  const subscriptionRequest = {
    subscription,
    basedOnKey: publicKeyJson.publicKey
  }

  let response = null;

  try {
    response = await fetch('/api/save-subscription/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionRequest)
    });
  } catch (e) {
    throw Error('Could not send subscription to backend', e)
  }

  if (!response.ok) {
    if (response.status === 409) {
      await saveNewPublicKey(response);
      throw Error('Public key has changed');
    }
    throw Error('Unknown error when saving subscription', response);
  }

  const responseData = await response.json();
  if(!responseData || !responseData.hasOwnProperty('id')) {
    throw Error('Malformed response: missing subscription id');
  }
  return responseData.id;
}

async function saveNewPublicKey(response) {
  const json = await response.json();
  if (json && json.error && json.error.newKey) {
    console.log('Using new public key from server for notifications.');
    publicKey = json.error.newKey;
  } else {
    console.error('Response did not contain a new public key.');
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
