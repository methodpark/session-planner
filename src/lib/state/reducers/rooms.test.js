import { reducer } from '../state';
import { updateSessions } from './sessions';

describe('rooms', () => {
  const sessions = [{
    id: 42,
    title: 'fooTitle',
    host: 'fooHost',
    room: 'fooRoom',
    start: '2018-01-01 10:00:00',
    end: '2018-01-01 12:00:00'
  }];
  const action = updateSessions({ sessions });

  it('should add the room if there is none', () => {
    const state = {};

    const newState = reducer(state, action);

    expect(newState.rooms).toEqual(['fooRoom']);
  });

  it('should not add the room if it is there already', () => {
    const state = { rooms: ['fooRoom'] };

    const newState = reducer(state, action);

    expect(newState.rooms).toEqual(['fooRoom']);
  });
});