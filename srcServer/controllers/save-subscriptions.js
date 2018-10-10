const { isValidPushSubscription, saveSubscriptionToArray } = require('../notifications');

async function saveSubscriptions(request, response) {
  if (isValidPushSubscription(request, response)) {
    try {
      const subscriptionId = await saveSubscriptionToArray(request.body);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({ data: { success: true, id: subscriptionId } }));
    }
    catch (err) {
      response.status(500);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({
        error: {
          id: 'unable-to-save-subscription',
          message: 'The subscription was received but we were unable to save it to our database.'
        }
      }));
    }
  }
}

module.exports.saveSubscriptions = saveSubscriptions;
