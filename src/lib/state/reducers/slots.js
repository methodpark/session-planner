import dedupe from 'dedupe';
import moment from 'moment';

import { createAction } from '../../../lib/util';
import { UPDATE_SESSIONS } from './sessions';

export const SET_ACTIVE = 'SET_ACTIVE';

export function setActive(slot) {
  return createAction(SET_ACTIVE, { slot });
}

export function slotsReducer(slots = [], action) {
  switch (action.type) {
    case UPDATE_SESSIONS:
      let newSlotList = slots;
      action.sessions.forEach(session => {
        const slotTitle = _formatSlot(session.start, session.end);
        const slotList = [...newSlotList, { title: slotTitle, start: session.start, end: session.end, active: false }];
        newSlotList = dedupe(slotList, slot => slot.title);
      });
      return newSlotList;

    case SET_ACTIVE:
      return slots.map(slot => {
        if (slot.title === action.slot) {
          return { ...slot, active: true };
        }

        return { ...slot, active: false }
      });

    default:
      return slots;
  }
}

export function _formatSlot(start, end) {
  return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
}