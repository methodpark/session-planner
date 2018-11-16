const moment = require('moment');

const rooms = ['BASIC', 'Clojure', 'Dylan', 'Eiffel', 'Forth', 'Groovy', 'Haskell', 'Idris', 'Julia'];
const startOfDay = moment('2018-11-17 11:00:00');
const endOfDay = moment('2018-11-17 18:00:00');
const baseId = 'SWEC18-01';


let start = startOfDay;
const sessions = [];
while (start.isBefore(endOfDay)) {
  for (const room of rooms) {
    const id = `${baseId}-${sessions.length.toString().padStart(3, '0')}`;
    sessions.push({
      id,
      title: '',
      host: '',
      room,
      start: start.format(),
      end: moment(start).add(1, 'hour').format()
    });
  }
  start.add(1, 'hour');
  if (start.hour() === 13) {
    start.add(1, 'hour');
  }
}

console.log(JSON.stringify(sessions, null, 2));