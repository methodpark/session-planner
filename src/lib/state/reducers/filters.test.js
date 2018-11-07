import {
  setFavoritesFilter,
  setOnlyInFutureFilter,
  SET_FAVORITES_FILTER,
  SET_ONLY_IN_FUTURE_FILTER,
  filtersReducer
} from './filters';

describe('redux filter state handling', () => {

  describe('action creation', () => {
    it('returns a "only favorites" filter action with the given boolean', () => {
      const activeState = true;

      const action = setFavoritesFilter(activeState);

      expect(action).toEqual({ type: SET_FAVORITES_FILTER, activeState });
    });

    it('returns "a only future" filter action with the given boolean', () => {
      const activeState = true;

      const action = setOnlyInFutureFilter(activeState);

      expect(action).toEqual({ type: SET_ONLY_IN_FUTURE_FILTER, activeState });
    });
  });

  describe('reducer', () => {

    it('does nothing if the action is not supported', () => {
      const input = {};

      const output = filtersReducer(input, {type: 'SOME_IRRELEVANT_STRING'});

      expect(output).toBe(input);
    });

    it('does not change other state when setting the "only favorites" filter', () => {
      const input = { someOtherState: 'foo' };

      const output = filtersReducer(input, setFavoritesFilter(true));

      expect(output.someOtherState).toBe(input.someOtherState);
    });

    it('does not change other state when setting the "only in future" filter', () => {
      const input = { someOtherState: 'foo' };

      const output = filtersReducer(input, setOnlyInFutureFilter(true));

      expect(output.someOtherState).toBe(input.someOtherState);
    });

    [true, false].forEach((sourceState) => {
      [true, false].forEach((targetState) => {
        it(`sets the "only favorites" filter state to ${targetState} if it was ${sourceState}`, () => {
          const oldState = { onlyFavorites: sourceState };

          const resultState = filtersReducer(oldState, setFavoritesFilter(targetState));

          expect(resultState.onlyFavorites).toBe(targetState);
        });

        it(`sets the "only in future" filter state to ${targetState} if it was ${sourceState}`, () => {
          const oldState = { onlyInFuture: sourceState };

          const resultState = filtersReducer(oldState, setOnlyInFutureFilter(targetState));

          expect(resultState.onlyInFuture).toBe(targetState);
        });
      });
    });

  });

});