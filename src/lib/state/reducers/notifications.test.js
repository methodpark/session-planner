import {
  toggleNotifications,
  TOGGLE_NOTIFICATIONS,
  notificationsReducer
} from './notifications';

describe('redux filter state handling', () => {

  describe('action creation', () => {
    it('returns an action of type TOGGLE_NOTIFICATIONS', () => {
      const action = toggleNotifications();

      expect(action).toEqual({ type: TOGGLE_NOTIFICATIONS });
    });
  });

  describe('reducer', () => {

    it('does nothing if the action is not supported', () => {
      const input = {};

      const output = notificationsReducer(input, {type: 'SOME_IRRELEVANT_STRING'});

      expect(output).toBe(input);
    });

    it('does not change other state when toggling notifications', () => {
      const input = { someOtherState: 'foo' };

      const output = notificationsReducer(input, toggleNotifications());

      expect(output.someOtherState).toBe(input.someOtherState);
    });

    it('activates notifications if the current state is not defined', () => {
      const input = undefined;

      const output = notificationsReducer(input, toggleNotifications());

      expect(output.active).toBe(true);
    });

    it('activates notifications if they are not configured in the current state', () => {
      const input = { };

      const output = notificationsReducer(input, toggleNotifications());

      expect(output.active).toBe(true);
    });

    [true, false].forEach((sourceState) => {
      const targetState = !sourceState;
      it(`sets the "active" state to ${targetState} if it was ${sourceState}`, () => {
        const oldState = { active: sourceState };

        const resultState = notificationsReducer(oldState, toggleNotifications());

        expect(resultState.active).toBe(targetState);
      });
    });

  });

});