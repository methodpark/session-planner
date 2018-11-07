import { createAction } from '../../../lib/util';
import { _formatSlot } from './slots';

export const UPDATE_SESSIONS = 'UPDATE_SESSIONS';

export function updateSessions(sessions) {
  return createAction(UPDATE_SESSIONS, sessions);
}

export function sessionsReducer(sessions = [], action) {
  switch (action.type) {
    case UPDATE_SESSIONS:
      return action.sessions.map(s => ({ ...s, slot: _formatSlot(s.start, s.end) }));
    default:
      return sessions;
  }
}