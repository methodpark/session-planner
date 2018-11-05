import moment from 'moment';
import dedupe from 'dedupe';

import {combineReducers} from 'redux';

import {createAction} from '../../lib/util';

// ---------------------- actions ----------------------

export const UPDATE_SESSIONS = 'UPDATE_SESSIONS';
export const SET_ACTIVE      = 'SET_ACTIVE';

export const INIT_FAVORITES  = 'INIT_FAVORITES';
export const SET_FAVORITE    = 'SET_FAVORITE';
export const UNSET_FAVORITE  = 'UNSET_FAVORITE';

export function updateSessions(sessions) {
  return createAction(UPDATE_SESSIONS, sessions);
}

export function setActive(slot) {
  return createAction(SET_ACTIVE, {slot});
}

export function initFavorites(favorites) {
  return createAction(INIT_FAVORITES, {favorites});
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
    case UPDATE_SESSIONS:
      return action.sessions.map(s => ({...s, slot: _formatSlot(s.start, s.end)}));
    default:
      return sessions;
  }
}

function slotsReducer(slots=[], action) {
  switch (action.type) {
    case UPDATE_SESSIONS:
      let newSlotList = slots;
      action.sessions.forEach(session => {
        const slotTitle = _formatSlot(session.start, session.end);
        const slotList = [...newSlotList, {title: slotTitle, start: session.start, end: session.end, active: false}];
        newSlotList = dedupe(slotList, slot => slot.title);
      });
      return newSlotList;

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
    case UPDATE_SESSIONS:
      let newRoomList = rooms;
      action.sessions.forEach(session => {
        newRoomList = dedupe([...newRoomList, session.room]);
      })
      return newRoomList;

    default:
      return rooms;
  }
}

function favoritesReducer(favorites=[], action) {
  switch (action.type) {
    case INIT_FAVORITES:
      return action.favorites || [];

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
