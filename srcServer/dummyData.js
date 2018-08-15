const moment = require('moment');
const faker = require('faker');
const dedupe = require('dedupe');
const slug = require('slug');
const { sendNotification } = require('./server');
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
      const title = randomTitle();

      myTrack.sessions.push({
        id: id++,
        title,
        slug: slug(title),
        description: randomDescription(),
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

const toTitleCase = (title) => title.replace(/\b\w/g, l => l.toUpperCase());

const randomTitle = () => toTitleCase(faker.company.bs());

const randomDescription = () =>
  faker.lorem.paragraphs(Math.ceil(Math.random() * 3), "<br><br>")

function modifyTrack(track) {
  track.sessions = track.sessions.map(session => {
    if (Math.random() < 0.05) {
      const oldTitle = session.title;
      const newTitle = randomTitle();
      console.log(`title changed (${oldTitle} → ${newTitle})`);

      session.title = newTitle;
      session.slug = slug(newTitle);
    }

    if (Math.random() < 0.05) {
      console.log(`description of session "${session.title}" changed`);
      session.description = randomDescription();
    }

    return session;
  });

  return track;
}


module.exports.generateSessions = generateSessions;
module.exports.modifySessions = modifySessions;