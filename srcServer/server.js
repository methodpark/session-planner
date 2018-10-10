const express = require('express');
const bodyParser = require('body-parser');
const readline = require('readline');

const { generateSessions, modifySessions } = require('./dummyData');
const { isValidPushSubscription, saveSubscriptionToArray, subscriptions, sendNotification } = require('./notifications');

const PORT = 8080;

let sessions = generateSessions();

express()
  .use(express.static('build'))
  .use(bodyParser.json())
  .get('/sessions', (req, res) => {
    console.log('#### request incoming ####');
    return res.json(sessions);
  })
  .post('/api/save-subscription/', (request, response) => {
    if (isValidPushSubscription(request, response)) {
      return saveSubscriptionToArray(request.body)
        .then(function (subscriptionId) {
          response.setHeader('Content-Type', 'application/json');
          response.send(JSON.stringify({ data: { success: true, id: subscriptionId } }));
        })
        .catch(function (err) {
          response.status(500);
          response.setHeader('Content-Type', 'application/json');
          response.send(JSON.stringify({
            error: {
              id: 'unable-to-save-subscription',
              message: 'The subscription was received but we were unable to save it to our database.'
            }
          }));
        });
    }
  })
  .listen(PORT, () => console.log(`listening: ${PORT}`));

let readlineClient = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
readlineClient.on('line', function (line) {
  console.log('--- simulating update ---');
  sessions = modifySessions(sessions);
  subscriptions.forEach(subscription => {
    sendNotification(subscription, JSON.stringify({ notification: { title: 'Title change:', body: 'test' } }));
  });
});
console.log('--- press enter to send a notification to clients ---');
