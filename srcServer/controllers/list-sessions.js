const path = require('path');

const SessionProvider = require('../lib/SessionProvider');

const sessionProvider = new SessionProvider(path.join(__dirname, '../../'));

async function listSessions(request, response) {
  const sessions = await sessionProvider.getSessions();

  return response.json(sessions);
}

module.exports.listSessions = listSessions;
