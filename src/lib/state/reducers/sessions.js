import { createAction } from '../../../lib/util';
import { _formatSlot } from './slots';

export const UPDATE_SESSIONS = 'UPDATE_SESSIONS';
export const UPDATE_SINGLE_SESSION = 'UPDATE_SINGLE_SESSION';

export function updateSessions(sessions) {
  return createAction(UPDATE_SESSIONS, sessions);
}

export function sessionsReducer(sessions = [], action) {
  switch (action.type) {
    case UPDATE_SESSIONS:
      return action.sessions.map(s => ({ ...s, slot: _formatSlot(s.start, s.end) }));
    case UPDATE_SINGLE_SESSION:
      const { session } = action.change;
      const { id } = session;

      if (action.change.what === 'DELETED') {
        return sessions.filter(s => s.id !== id);
      }

      if (action.change.what === 'NEW') {
        return [...sessions, {...session, slot: _formatSlot(session.start, session.end)}];
      }

      return sessions.map(s => (s.id === id ? {...session, slot: s.slot} : s));
    default:
      return sessions;
  }
}