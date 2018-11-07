import { reducer } from '../state';
import { setActive } from './slots';
import { updateSessions } from './sessions';

describe('slots', () => {
  const sessions = [{
    id: 23,
    title: 'fooTitle',
    host: 'fooHost',
    room: 'fooRoom',
    start: '2018-01-01 10:00:00',
    end: '2018-01-01 12:00:00'
  }];
  const action = updateSessions({ sessions });

  it('should add the slot if there is none', () => {
    const state = {};

    const newState = reducer(state, action);

    const expected = [{
      active: false,
      title: '10:00 - 12:00',
      start: '2018-01-01 10:00:00',
      end: '2018-01-01 12:00:00'
    }];
    expect(newState.slots).toEqual(expected);
  });

  it('should not add the slot if its already there, compared by title', () => {
    const state = {
      slots: [{
        active: true,
        title: '10:00 - 12:00',
        start: '2018-01-01 10:00:00',
        end: '2018-01-01 12:00:00'
      }]
    };

    const newState = reducer(state, action);

    expect(newState.slots).toEqual([state.slots[0]]);
  });


  describe('setActive', () => {
    const action = setActive('10:00 - 12:00');

    it('should set the slot active that is active', () => {
      const state = {
        slots: [
          { active: false, title: '10:00 - 12:00' },
          { active: false, title: '12:00 - 14:00' },
          { active: false, title: '14:00 - 16:00' }
        ]
      };

      const newState = reducer(state, action);

      expect(newState.slots).toEqual([
        { active: true, title: '10:00 - 12:00' },
        { active: false, title: '12:00 - 14:00' },
        { active: false, title: '14:00 - 16:00' }
      ]);
    });

    it('should unset all other active slots', () => {
      const state = {
        slots: [
          { active: false, title: '10:00 - 12:00' },
          { active: false, title: '12:00 - 14:00' },
          { active: true, title: '14:00 - 16:00' }
        ]
      };

      const newState = reducer(state, action);

      expect(newState.slots).toEqual([
        { active: true, title: '10:00 - 12:00' },
        { active: false, title: '12:00 - 14:00' },
        { active: false, title: '14:00 - 16:00' }
      ]);
    });
  });

});