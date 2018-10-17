function factory(sessionProvider) {
  return async function listSessions(request, response) {
    const sessions = await sessionProvider.getSessions();
  
    return response.json(sessions);
  }
}

module.exports = factory;
