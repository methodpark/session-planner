const express = require('express');
const generateSessions = require('./generateSessions');

const sessions = generateSessions();

express()
  .get('/sessions', (req, res, next) => res.json(sessions))
  .listen(8080, () => console.log('listening'));