import moment from 'moment';
import dedupe from 'dedupe';

import {combineReducers} from 'redux';

import {createAction} from '../../lib/util';

// ---------------------- actions ----------------------

export const ADD_SESSION    = 'ADD_SESSION';
export const SET_ACTIVE     = 'SET_ACTIVE';
export const SET_FAVORITE   = 'SET_FAVORITE';
export const UNSET_FAVORITE = 'UNSET_FAVORITE';

export function addSession(id, title, host, room, start, end) {
  return createAction(ADD_SESSION, {id, title, host, room, start, end});
}

export function setActive(slot) {
  return createAction(SET_ACTIVE, {slot});
}

export function setFavorite(id) {
  return createAction(SET_FAVORITE, {id});
}

export function unsetFavorite(id) {
  return createAction(UNSET_FAVORITE, {id});
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

function favoritesReducer(favorites=[], action) {
  switch (action.type) {
    case SET_FAVORITE:
      return favorites.find(id => id === action.id) !== undefined
        ? favorites
        : [...favorites, action.id];

    case UNSET_FAVORITE:
      return favorites.filter(id => id !== action.id);

    default:
      return favorites;
  }
}

export const reducer = combineReducers({
  sessions:  sessionsReducer,
  slots:     slotsReducer,
  rooms:     roomsReducer,
  favorites: favoritesReducer
});



function _formatSlot(start, end) {
  return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
}
