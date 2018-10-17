const webpush = require('web-push');
const fs = require('fs');

let publicKey = null;
let subscriptions = [];

function initializeNotifications(vapidKeysFile) {
  const vapidKeys = _loadVapidKeys(vapidKeysFile);

  webpush.setVapidDetails(
    'mailto:info@methodpark.de',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
}

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

function checkSubscriptionRequestForErrors(request) {
  // Check the request body has at least an endpoint.
  if (!request || !request.subscription || !request.subscription.endpoint) {
    // Not a valid subscription.
    return {
      errorCode: 400,
      response: {
        id: 'missing-data',
        message: 'Request must have a subscription, its basing key and an subscription endpoint'
      }
    };
  }

  if (request.basedOnKey !== publicKey) {
    return {
      errorCode: 409,
      response: {
        id: 'expired-key',
        newKey: publicKey,
        message: 'Subscription was sent using the wrong (expired) public key.'
      }
    };
  }

  return null;
};

function saveSubscriptionToArray(subscription) {
  return new Promise(function (resolve, reject) {

    subscriptions.push(subscription);

    resolve(subscriptions.length - 1);
  });
};

function _loadVapidKeys(filename) {
  const jsonString = fs.readFileSync(filename);
  const keys = JSON.parse(jsonString);
  publicKey = keys.publicKey;
  return keys;
}

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


module.exports.initializeNotifications = initializeNotifications;
module.exports.checkSubscriptionRequestForErrors = checkSubscriptionRequestForErrors;
module.exports.saveSubscriptionToArray = saveSubscriptionToArray;
module.exports.sendNotifications       = sendNotifications;
