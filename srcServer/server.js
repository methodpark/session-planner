const express = require('express');
const generateSessions = require('./generateSessions');
const modifySessions = require('./modifySessions');

const PORT = 8080;

let sessions = generateSessions();

express()
  .use(express.static('build'))
  .get('/sessions', (req, res) => {
    console.log('#### request incoming ####');
    return res.json(sessions);
  })
  .listen(PORT, () => console.log(`listening: ${PORT}`));

setInterval(() => {
  console.log('--- simulating update ---');
  sessions = modifySessions(sessions);
}, 10000);

sessions = modifySessions(sessions);