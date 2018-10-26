import moment from 'moment';
import ms from 'ms';

import { delay } from 'redux-saga';
import { select, put } from 'redux-saga/effects';

import { setActive } from './state';

export default function* () {
  yield activeSaga();
}

function* activeSaga() {
  yield delay(ms('3s'));

  while (true) {
    const slots = yield select(state => state.slots);
    const now = moment();

    const mySlot = slots.find(({ start, end }) => {
      return now.isBetween(disregardDate(start), disregardDate(end));
    });

    if (mySlot) {
      yield put(setActive(mySlot.title));
    }

    yield delay(ms('1m'));
  }
}

function disregardDate(timeString) {
  const m = moment(timeString);
  const now = moment();

  now.hours(m.hours());
  now.minutes(m.minutes());
  now.seconds(0);
  now.milliseconds(0);

  return now;
}