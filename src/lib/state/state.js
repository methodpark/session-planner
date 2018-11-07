import {combineReducers} from 'redux';

import { sessionsReducer } from './reducers/sessions';
import { slotsReducer } from './reducers/slots';
import { roomsReducer } from './reducers/rooms';
import { favoritesReducer } from './reducers/favorites';
import { promptReducer } from './reducers/prompt';
import { filtersReducer } from './reducers/filters';

export const reducer = combineReducers({
  sessions:  sessionsReducer,
  slots:     slotsReducer,
  rooms:     roomsReducer,
  favorites: favoritesReducer,
  prompt:    promptReducer,
  filters:   filtersReducer
});
