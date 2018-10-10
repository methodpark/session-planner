const readline = require('readline');

const { generateSessions, modifySessions } = require('./dummyData');
const { subscriptions, sendNotification } = require('./notifications');

let sessions;

function getSessions() {
  return sessions;
}

function initializeSessions() {
  sessions = generateSessions();

  const readlineClient = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  readlineClient.on('line', function () {
    console.log('--- simulating update ---');
    sessions = modifySessions(sessions);
    subscriptions.forEach(subscription => {
      sendNotification(subscription, JSON.stringify(
        { notification: { title: 'Title change:', body: 'test' } }
      ));
    });
  });

  console.log('--- press enter to send a notification to clients ---');
}

module.exports.getSessions = getSessions;
module.exports.initializeSessions = initializeSessions;
