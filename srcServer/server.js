const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { initializeNotifications, sendNotifications } = require('./notifications');
const listSessions = require('./controllers/list-sessions');
const { saveSubscriptions } = require('./controllers/save-subscriptions');
const SessionProvider = require('../srcServer/lib/SessionProvider');

const KEYS_FILE = "vapid-keys.private.json";
const PORT = 8080;

const sessionsProvider = new SessionProvider(path.join(__dirname, '../sessionsData.json'));
try {
  initializeNotifications(KEYS_FILE);
} catch (err) {
  console.error('Could not initialize notifications.');
  console.error('Generate keys with "npm run generate-notification-keys".');
  process.exit(1);
}

express()
  .use(express.static('build'))
  .use(bodyParser.json())
  .get('/sessions', listSessions(sessionsProvider))
  .post('/api/save-subscription/', saveSubscriptions)
  .listen(PORT, () => console.log(`listening: ${PORT}`));

sessionsProvider.on('sessionUpdate', async change => {
  //notify everybody!!!

  //this is how a possible change event looks like:
  //{
  //  what: 'CHANGE',
  //  message: titleChange|hostChange|roomChange|startChange|endChange,
  //  session: theChangedSession
  //}

  console.log('change happened', change);

  // TODO: check diff, send s.th. that's actually useful
  const notification = {
    title: 'Sessions updated! \\o/',
    body: 'Check out the new stuff and such.'
  }
  await sendNotifications({ notification });
});
