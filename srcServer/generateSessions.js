const moment = require('moment');
const faker = require('faker');

function generateSessions() {
  const countTracks = 4;

  let id = 0;
  const result = {};
  for (var trackNumber = 0; trackNumber < countTracks; trackNumber++) {
    const trackId = 'track' + trackNumber;
    const myTrack = {
      trackId,
      name: faker.company.bs(),
      room: faker.commerce.color(),
      sessions: []
    };
    result[trackId] = myTrack;

    const startTime = moment('2018-01-01 08:00:00');
    const lastSession = moment('2018-01-01 16:00:00');
    let currentSession = startTime.clone();

    while(currentSession.isBefore(lastSession)) {
      const sessionEnd = currentSession.clone().add(2, 'hours');

      myTrack.sessions.push({
        id: id++,
        title: faker.commerce.productName(),
        description: 'lorem, ey',
        start: currentSession.format(),
        end: sessionEnd.format()
      });

      currentSession = sessionEnd;
    }
  }

  return result;
}

module.exports = generateSessions;