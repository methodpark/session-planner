const webpush = require('web-push');
const fs = require('fs');

let publicKey = null;
let subscriptions = [];

function _loadVapidKeys(filename) {
  const jsonString = fs.readFileSync(filename);
  const keys = JSON.parse(jsonString);
  publicKey = keys.publicKey;
  return keys;
}

function initializeNotifications(vapidKeysFile) {
  const vapidKeys = _loadVapidKeys(vapidKeysFile);

  webpush.setVapidDetails(
    'mailto:info@methodpark.de',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
}

function isValidPushSubscription(request, response) {
  // Check the request body has at least an endpoint.
  if (!request.body || !request.body.subscription || !request.body.subscription.endpoint) {
    // Not a valid subscription.
    response.status(400);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({
      error: {
        id: 'no-endpoint',
        message: 'Subscription must have an endpoint.'
      }
    }));
    return false;
  }

  const { basedOnKey } = request.body;
  console.log("Expecting", publicKey);
  console.log("Received ", basedOnKey);

  if (basedOnKey !== publicKey) {
    response.status(409);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({
      error: {
        id: 'expired-key',
        newKey: publicKey,
        message: 'Subscription was sent using the wrong (expired) public key.'
      }
    }));
    return false;
  }
  return true;
};

function saveSubscriptionToArray(subscription) {
  return new Promise(function (resolve, reject) {

    subscriptions.push(subscription);

    resolve(subscriptions.length - 1);
  });
};

function _deleteSubscriptionFromArray(staleSubscription) {
  subscriptions = subscriptions.filter(
    subscription => subscription !== staleSubscription
  );
}

async function _sendNotification(subscription, dataToSend) {
  try {
    await webpush.sendNotification(subscription, dataToSend);
  }
  catch (err) {
    if (err.statusCode === 410) {
      console.log('removing stale subscription');
      _deleteSubscriptionFromArray(subscription);
      const numberOfSubscribers = subscriptions.length;
      console.log(`${numberOfSubscribers} subscribers left.`);
    } else {
      console.error('ERROR FIXME WTF Subscription is no longer valid: ', err);
    }
  }
};

async function sendNotifications(data) {
  const numberOfSubscribers = subscriptions.length;
  console.log(`Sending notifications to ${numberOfSubscribers} subscribers.`);

  subscriptions.forEach(async subscription => {
    try {
      await _sendNotification(subscription, JSON.stringify(data));
    } catch (err) {
      console.log('Error for sub', subscription, err);
    }
  });
}

module.exports.initializeNotifications = initializeNotifications;
module.exports.isValidPushSubscription = isValidPushSubscription;
module.exports.saveSubscriptionToArray = saveSubscriptionToArray;
module.exports.sendNotifications       = sendNotifications;
