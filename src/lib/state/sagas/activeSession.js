import moment from 'moment';
import ms from 'ms';

import { delay } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import { setActive } from '../reducers/slots';
import { disregardDate } from '../../util';

export function* watchActiveSessions() {
  while ((yield select(state => state.slots)).length === 0) {
    yield delay(ms('0.2s'));
  }

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
