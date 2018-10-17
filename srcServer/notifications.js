const webpush = require('web-push');
const fs = require('fs');

let publicKey = null;
let subscriptions = [];

function loadVapidKeys(filename) {
  const jsonString = fs.readFileSync(filename);
  const keys = JSON.parse(jsonString);
  publicKey = keys.publicKey;
  return keys;
}

function initializeNotifications(vapidKeysFile) {
  const vapidKeys = loadVapidKeys(vapidKeysFile);

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

function deleteSubscriptionFromArray(id) {
  subscriptions.splice(id, 1);
}

async function sendNotification(subscription, dataToSend) {
  try {
    return webpush.sendNotification(subscription, dataToSend);
  }
  catch (err) {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromArray(subscription._id);
    } else {
      console.log('Subscription is no longer valid: ', err);
    }
  }
};

async function sendNotifications() {
  const numberOfSubscribers = subscriptions.length;
  console.log(`Sending notifications to ${numberOfSubscribers} subscribers.`);

  subscriptions.forEach(async subscription => {
    try {
      await sendNotification(subscription, JSON.stringify(
        { notification: { title: 'Title change:', body: 'test' } }
      ));
    } catch (err) {
      console.log('Error for sub', subscription, err);
    }
  });
}

module.exports.initializeNotifications = initializeNotifications;
module.exports.isValidPushSubscription = isValidPushSubscription;
module.exports.saveSubscriptionToArray = saveSubscriptionToArray;
module.exports.sendNotifications       = sendNotifications;
