import { reducer } from '../state';
import { discardPrompt } from './prompt';

describe('prompt', () => {

  describe('when called with discardPrompt action', () => {

    describe('with empty state', () => {

      it('it sets the discarded flag', () => {
        const state = {};
        const action = discardPrompt("some timestamp");

        const newState = reducer(state, action);

        expect(newState.prompt.discarded).toBe(true);
      });

      it('it sets the timestamp as discardedAt', () => {
        const state = {};
        const timestamp = "some timestamp";
        const action = discardPrompt(timestamp);

        const newState = reducer(state, action);

        expect(newState.prompt.discardedAt).toBe(timestamp);
      });

    });

  });

});