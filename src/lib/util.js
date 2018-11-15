import moment from 'moment';

export function createAction(type, ...parameters) {
  return Object.assign({}, {type}, ...parameters);
}

export function disregardDate(timeString) {
  const m = moment(timeString);
  const now = moment();

  now.hours(m.hours());
  now.minutes(m.minutes());
  now.seconds(0);
  now.milliseconds(0);

  return now;
}