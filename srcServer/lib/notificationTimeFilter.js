const moment = require('moment');
const path = require('path');
const jsonFileLoader = require('./jsonFileLoader');

const TIME_CONFIG = '../config/notificationTime.json';
const configPath = path.join(__dirname, TIME_CONFIG);

let notificationIntervals = [];
jsonFileLoader.loadJsonFile(configPath)
  .then(times => notificationIntervals = times)
  .catch(console.error);

function isCurrentTimeInsideOfAnyNotificationTimeInterval() {
  return notificationIntervals.some(timeInterval => isCurrentTimeInsideOfNotificationTimeInterval(timeInterval));
}

function isCurrentTimeInsideOfNotificationTimeInterval(timeInterval) {
  const now = moment();
  return isTimeInsideOfTimeInterval(now, timeInterval);
}

function isTimeInsideOfTimeInterval(time, timeInterval) {
  const beginOfInterval = moment(timeInterval.start);
  const endOfInterval = moment(timeInterval.end);
  return time.isBetween(beginOfInterval, endOfInterval);
}

module.exports.isCurrentTimeInsideOfAnyNotificationTimeInterval = isCurrentTimeInsideOfAnyNotificationTimeInterval;
module.exports.isTimeInsideOfTimeInterval = isTimeInsideOfTimeInterval;
