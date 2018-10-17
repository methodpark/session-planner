const { checkSubscriptionRequestForErrors, saveSubscriptionToArray } = require('../notifications');

async function saveSubscriptions(request, response) {
  const error = checkSubscriptionRequestForErrors(request.body);
  if(error !== null) {
    _sendErrorResponse(response, error);
    return;
  }

  try {
    const subscription = request.body.subscription;
    const subscriptionId = await saveSubscriptionToArray(subscription);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({ id: subscriptionId }));

  } catch (err) {
    _sendErrorResponse(response, {
      errorCode: 500,
      response: {
        id: 'unable-to-save-subscription',
        message: 'The subscription was received but we were unable to save it to our database.'
      }
    });
  }
}

function _sendErrorResponse(response, error) {
  response.status(error.errorCode);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ error: error.response }));
}

module.exports.saveSubscriptions = saveSubscriptions;
