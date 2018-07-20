const moment = require('moment');
const faker = require('faker');
const dedupe = require('dedupe');

const trackNames = dedupe(Array.from(Array(30), _ => faker.name.jobType()));
const roomNames = dedupe(Array.from(Array(30), _ => faker.commerce.color()));

function generateSessions() {
  const countTracks = 6;

  let id = 0;
  const result = [];
  for (var trackNumber = 0; trackNumber < countTracks; trackNumber++) {
    const trackId = 'track' + trackNumber;
    const myTrack = {
      trackId,
      name: trackNames.pop(),
      room: roomNames.pop(),
      sessions: []
    };
    result.push(myTrack);

    const startTime = moment('2018-01-01 08:00:00');
    const lastSession = moment('2018-01-01 16:00:00');
    let currentSession = startTime.clone();

    while(currentSession.isBefore(lastSession)) {
      const sessionEnd = currentSession.clone().add(2, 'hours');

      myTrack.sessions.push({
        id: id++,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraphs(Math.ceil(Math.random() * 3), "<br><br>"),
        start: currentSession.format(),
        end: sessionEnd.format()
      });

      currentSession = sessionEnd;
    }
  }

  return result;
}

function modifySessions(tracks) {
  return tracks.map(track => modifyTrack(track));
}

function modifyTrack(track) {
  track.sessions = track.sessions.map(session => {
    if (Math.random() < 0.05) {
      console.log('title changed');
      session.title = faker.commerce.productName();
    }

    if (Math.random() < 0.05) {
      console.log('description changed');
      session.description = faker.lorem.paragraphs(Math.ceil(Math.random() * 3), "<br><br>");
    }

    return session;
  });

  return track;
}

module.exports.generateSessions = generateSessions;
module.exports.modifySessions = modifySessions;