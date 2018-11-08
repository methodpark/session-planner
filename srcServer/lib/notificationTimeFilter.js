const moment = require('moment');
const fs = require('fs');
const path = require('path');

const TIME_CONFIG = '/config/notificationTime.json';
const configPath = path.join(__dirname, TIME_CONFIG);


async function filter() {
  var times = await _loadData();
  return times.some(timeInterval => isCurrentTimeInsideOfNotificationTimeInterval(timeInterval));
}

function isCurrentTimeInsideOfNotificationTimeInterval(timeInterval) {
  const now = moment();
  return isTimeInsideOfTimeInterval(now, timeInterval);
}

function isTimeInsideOfTimeInterval(time, timeInterval) {
  const beginOfInterval = moment(timeInterval.start);
  const endOfInterval = moment(timeInterval.end);
  if(time instanceof moment){
    return time.isBetween(beginOfInterval, endOfInterval);
  }
  return false;
}

async function _loadData() {
  return new Promise((resolve, reject) => {
    fs.readFile(configPath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        data = JSON.parse(data);
        console.log('successfully file reloaded');
        resolve(data);
      }
      catch (e) {
        reject(e);
      }
    });
  });
}

module.exports.filter = filter;
module.exports.isTimeInsideOfTimeInterval = isTimeInsideOfTimeInterval;