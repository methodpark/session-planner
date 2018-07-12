const express = require('express');
const generateSessions = require('./generateSessions');

const sessions = generateSessions();

const PORT = 8080;

express()
  .use(express.static('build'))
  .get('/sessions', (req, res, next) => res.json(sessions))
  .listen(PORT, () => console.log(`listening: ${PORT}`));