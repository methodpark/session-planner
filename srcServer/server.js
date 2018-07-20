const express = require('express');

const {generateSessions, modifySessions} = require('./dummyData');

const PORT = 8080;

let sessions = generateSessions();

express()
  .use(express.static('build'))
  .get('/sessions', (req, res) => {
    console.log('#### request incoming ####');

    // sporadicallyBreak();

    return res.json(sessions);
  })
  .listen(PORT, () => console.log(`listening: ${PORT}`));

setInterval(() => {
  console.log('--- simulating update ---');
  sessions = modifySessions(sessions);
}, 10000);

function sporadicallyBreak() {
  if (Math.random() < 0.3) {
    throw new Error('doesn\'t compute');
  }
}