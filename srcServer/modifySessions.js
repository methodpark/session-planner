const faker = require('faker');

function modifySessions(tracks) {
  return Object.values(tracks)
    .reduce((carry, track) => {
      carry[track.trackId] = modifyTrack(track);

      return carry;
    }, {});
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

module.exports = modifySessions;