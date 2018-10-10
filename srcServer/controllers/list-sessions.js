const { getSessions } = require('../sessions');

function listSessions(request, response) {
  console.log('#### request incoming ####');
  const sessions = getSessions();
  return response.json(sessions);
}

module.exports.listSessions = listSessions;
