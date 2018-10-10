const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BJRs5N-80wspERG5agPCaZILtDhX3f3DOF0iYu5URcNPNPcx2FCktXf0y9kIqpFgsTI_IXO-3JQHhhwIDsShorA',
  privateKey: 'dIX0wUfayoY_mvIP0k8lNv2ICFMQOM9yR_YupRas3Eg'
};

webpush.setVapidDetails(
  'mailto:info@methodpark.de',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

function isValidPushSubscription(request, response) {
  // Check the request body has at least an endpoint.
  if (!request.body || !request.body.endpoint) {
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

function sendNotification(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
    .catch((err) => {
      if (err.statusCode === 410) {
        return deleteSubscriptionFromArray(subscription._id);
      } else {
        console.log('Subscription is no longer valid: ', err);
      }
    });
};

module.exports.isValidPushSubscription = isValidPushSubscription;
module.exports.saveSubscriptionToArray = saveSubscriptionToArray;
module.exports.deleteSubscriptionFromArray = deleteSubscriptionFromArray;
module.exports.sendNotification = sendNotification;
module.exports.subscriptions = subscriptions;
