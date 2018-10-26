const moment = require('moment');
const faker = require('faker');
const dedupe = require('dedupe');

const roomNames = dedupe(Array.from(Array(30), _ => faker.name.jobType()));

function generateSessions() {
  const countTracks = 7;

  let id = 0;
  const result = [];
  for (var trackNumber = 0; trackNumber < countTracks; trackNumber++) {
    const room = roomNames.pop();
    const startTime = moment('2018-01-01 08:00:00');
    const lastSession = moment('2018-01-01 16:00:00');
    let currentSession = startTime.clone();

    while (currentSession.isBefore(lastSession)) {
      const sessionEnd = currentSession.clone().add(2, 'hours');
      const title = randomTitle();

      result.push({
        id: id++,
        title,
        host: `${faker.name.firstName()} ${faker.name.lastName()}`,
        room,
        start: currentSession.format(),
        end: sessionEnd.format()
      });

      currentSession = sessionEnd;
    }
  }

  return result;
}

const toTitleCase = (title) => title.replace(/\b\w/g, l => l.toUpperCase());

const randomTitle = () => toTitleCase(faker.company.bs());

module.exports.generateSessions = generateSessions;