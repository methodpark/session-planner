import dedupe from 'dedupe';
import { UPDATE_SESSIONS } from './sessions';

export function roomsReducer(rooms = [], action) {
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