import moment from 'moment';
import dedupe from 'dedupe';

import {combineReducers} from 'redux';
import {createAction} from '../lib/util';

// ---------------------- actions ----------------------

export const ADD_SESSION = 'ADD_SESSION';

export function addSession(id, title, host, room, start, end) {
  return createAction(ADD_SESSION, {id, title, host, room, start, end});
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
      return dedupe([...slots, _formatSlot(action.start, action.end)]);

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

// ---------------------- sagas ----------------------

export const saga = function* () {
  //here a sideeffects will be handled
}






function _formatSlot(start, end) {
  return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
}