import { reducer } from '../state';
import { updateSessions } from './sessions';

describe('sessions', () => {
  const sessions = [{
    id: 42,
    title: 'fooTitle',
    host: 'fooHost',
    room: 'fooRoom',
    start: '2018-01-01 10:00:00',
    end: '2018-01-01 12:00:00'
  }];
  const action = updateSessions({ sessions });

  it('should add the session if there is none', () => {
    const state = {};

    const newState = reducer(state, action);

    const expected = [{
      id: 42,
      title: 'fooTitle',
      host: 'fooHost',
      room: 'fooRoom',
      slot: '10:00 - 12:00',
      start: '2018-01-01 10:00:00',
      end: '2018-01-01 12:00:00'
    }];
    expect(newState.sessions).toEqual(expected);
  });

  it('should overwrite if a session with same id already exists', () => {
    const state = {
      sessions: [
        {
          id: 42,
          title: 'barTitle',
          host: 'barHost',
          room: 'barRoom',
          slot: '10:00 - 12:00',
          start: '2018-01-01 10:00:00',
          end: '2018-01-01 12:00:00'
        }
      ]
    };

    const newState = reducer(state, action);

    const expected = [{
      id: 42,
      title: 'fooTitle',
      host: 'fooHost',
      room: 'fooRoom',
      slot: '10:00 - 12:00',
      start: '2018-01-01 10:00:00',
      end: '2018-01-01 12:00:00'
    }];
    expect(newState.sessions).toEqual(expected);
  });
});