function sessionComparator(oldSessions, newSessions) {
  const result = [];

  newSessions.forEach(newSession => {
    const oldSession = oldSessions.find(oldSession => oldSession.id === newSession.id);

    if (oldSession) {
      //there may be a difference between the old and the new session
      const localResult = compareSessions(oldSession, newSession);
      if (localResult) {
        result.push(localResult);
      }
    } else {
      //newSession is a new session
      result.push({ what: 'NEW', message: 'newSession', session: newSession });
    }
  });

  oldSessions.forEach(oldSession => {
    const newSession = newSessions.find(newSession => newSession.id === oldSession.id);
    if (!newSession) {
      result.push({ what: 'DELETED', message: 'deletedSession', session: oldSession });
    }
  });

  return result;
}

function compareSessions(oldSession, newSession) {
  // compare title, room, speaker, end,   begin
  let resultMessage = "";  
  
  if (oldSession.title !== newSession.title) {
    resultMessage = 'titleChange';
  }
  else if (oldSession.speaker !== newSession.speaker) {
    resultMessage = 'speakerChange';
  }
  else if (oldSession.room !== newSession.room) {
    resultMessage = 'roomChange';
  }
  else if (oldSession.start !== newSession.start) {
    resultMessage = 'startChange';
  }
  else if (oldSession.end !== newSession.end) {
    resultMessage = "endChange";
  }

  if (resultMessage !== "") {
    return { what: 'CHANGE', message: resultMessage, session: newSession };
  }

  return null;      
}

module.exports = sessionComparator;