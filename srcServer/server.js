const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const listSessions = require('./controllers/list-sessions');
const { saveSubscriptions } = require('./controllers/save-subscriptions');
const SessionProvider = require('../srcServer/lib/SessionProvider');

const PORT = 8080;

const sessionsProvider = new SessionProvider(path.join(__dirname, '../sessionsData.json'));

express()
  .use(express.static('build'))
  .use(bodyParser.json())
  .get('/sessions', listSessions(sessionsProvider))
  .post('/api/save-subscription/', saveSubscriptions)
  .listen(PORT, () => console.log(`listening: ${PORT}`));

sessionsProvider.on('sessionUpdate', change => {
  //notify everybody!!!

  //this is how a possible change event looks like:
  //{ 
  //  what: 'CHANGE', 
  //  message: titleChange|hostChange|roomChange|startChange|endChange,
  //  session: theChangedSession 
  //}

  console.log('change happened', change);
});