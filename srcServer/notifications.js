const webpush = require('web-push');
const fs = require('fs');
const notificationTimeFilter = require('./lib/notificationTimeFilter');

const SUBSCRIPTION_PERSISTANCE_FILENAME = './subscriptions.json'

let publicKey = null;
let subscriptions = [];

function initializeNotifications(vapidKeysFile) {
  const vapidKeys = _loadVapidKeys(vapidKeysFile);

  webpush.setVapidDetails(
    'mailto:info@methodpark.de',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  subscriptions = _getPersistedSubscriptions(SUBSCRIPTION_PERSISTANCE_FILENAME);
}

async function sendNotifications(data) {
  const numberOfSubscribers = subscriptions.length;
  if (await notificationTimeFilter.isCurrentTimeInsideOfAnyNotificationTimeInterval()) {
    console.log(`Sending notifications to ${numberOfSubscribers} subscribers.`);

    subscriptions.forEach(async subscription => {
      try {
        await _sendNotification(subscription, JSON.stringify(data));
      } catch (err) {
        console.log('Error for sub', subscription, err);
      }
    });
  }
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
    _persistSubscriptions(SUBSCRIPTION_PERSISTANCE_FILENAME, subscriptions);

    resolve(subscriptions.length - 1);
  });
};

function _loadVapidKeys(filename) {
  const jsonString = fs.readFileSync(filename);
  const keys = JSON.parse(jsonString);
  publicKey = keys.publicKey;
  return keys;
}

function _getPersistedSubscriptions(filename) {
  if (!fs.existsSync(filename)) {
    return [];
  }

  const jsonString = fs.readFileSync(filename);
  return JSON.parse(jsonString);
}

const _persistSubscriptions = (() => {
  let writeOperationInProgress = {};
  let pendingOperations = {};

  return (filename, subscriptions) => {
    if (writeOperationInProgress[filename] !== undefined) {
      pendingOperations[filename] = subscriptions;
      return;
    }
    writeOperationInProgress[filename] = true;

    fs.writeFile(filename, JSON.stringify(subscriptions),
      (err) => {
        if (err !== null) {
          console.log('Error persisting subscriptions ', err);
        }

        delete writeOperationInProgress[filename];
        if (pendingOperations[filename]) {
          const pendingWrite = pendingOperations[filename];
          delete pendingOperations[filename];

          _persistSubscriptions(filename, pendingWrite);
        }
      });
  }
})();

function _deleteSubscriptionFromArray(staleSubscription) {
  subscriptions = subscriptions.filter(
    subscription => subscription !== staleSubscription
  );
  _persistSubscriptions(SUBSCRIPTION_PERSISTANCE_FILENAME, subscriptions);
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
module.exports.sendNotifications = sendNotifications;
