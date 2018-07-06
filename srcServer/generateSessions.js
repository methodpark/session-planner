const moment = require('moment');
const faker = require('faker');

function generateSessions() {
  const countTracks = 3;

  let id = 0;
  const result = {};
  for (var trackNumber = 0; trackNumber < countTracks; trackNumber++) {
    const myTrack = [];
    result['track' + trackNumber] = myTrack;

    const startTime = moment('2018-01-01 08:00:00');
    const lastSession = moment('2018-01-01 16:00:00');
    let currentSession = startTime.clone();

    while(currentSession.isBefore(lastSession)) {
      const sessionEnd = currentSession.clone().add(2, 'hours');

      myTrack.push({
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