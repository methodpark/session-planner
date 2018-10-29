import moment from 'moment';
import dedupe from 'dedupe';

import {combineReducers} from 'redux';

import {createAction} from '../../lib/util';

// ---------------------- actions ----------------------

export const ADD_SESSION = 'ADD_SESSION';
export const SET_ACTIVE = 'SET_ACTIVE';

export function addSession(id, title, host, room, start, end) {
  return createAction(ADD_SESSION, {id, title, host, room, start, end});
}

export function setActive(slot) {
  return createAction(SET_ACTIVE, {slot});
}

// ---------------------- reducers ----------------------

function sessionsReducer(sessions=[], action) {
  switch (action.type) {
    case ADD_SESSION:
      const newSessions = sessions.filter(session => session.id !== action.id);
      newSessions.push({
        id: action.id,
        title: action.title,
        host: action.host,
        room: action.room,
        start: action.start,
        end: action.end,
        slot: _formatSlot(action.start, action.end)
      });

      return newSessions;
    
    default:
      return sessions;
  }
}

function slotsReducer(slots=[], action) {
  switch (action.type) {
    case ADD_SESSION:
      const slotTitle = _formatSlot(action.start, action.end);
      const slotList = [...slots, {title: slotTitle, start: action.start, end: action.end, active: false}];
      return dedupe(slotList, slot => slot.title);

    case SET_ACTIVE:
      return slots.map(slot => {
        if (slot.title === action.slot) {
          return {...slot, active: true};
        }

        return {...slot, active: false}
      });

    default:
      return slots;
  }
}

function roomsReducer(rooms=[], action) {
  switch (action.type) {
    case ADD_SESSION:
      return dedupe([...rooms, action.room]);

    default:
      return rooms;
  }
}

export const reducer = combineReducers({
  sessions: sessionsReducer,
  slots: slotsReducer,
  rooms: roomsReducer
});





function _formatSlot(start, end) {
  return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
}