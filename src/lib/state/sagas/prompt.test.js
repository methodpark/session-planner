import {
  handlePromptDiscard,
  handlePromptInit
} from './prompt';

import { storePrompt } from '../../localStorage';
import { call, put } from 'redux-saga/effects';
import { discardPrompt } from '../reducers/prompt';

const mockRightNow = '2018-11-06T21:28:12.678Z';
const TwoHoursAgo = '2018-11-06T19:29:42.678Z';
const LastYear = '2017-11-06T19:29:42.678Z';
let mockReturnValueOfIsAfter = false

jest.mock('moment', () => () => ({
  value: mockRightNow,
  subtract: () => 'irrelevant',
  isAfter: () => mockReturnValueOfIsAfter
}));

describe('prompt saga', () => {

  describe('handle prompt discard', () => {

    it('stores the prompt state in local storage', () => {
      const promptDiscardHandler = handlePromptDiscard();
      const state = {prompt: 'some prompt state'};

      // get the state from redux
      promptDiscardHandler.next();

      // store the state in local storage
      const storeCall = promptDiscardHandler.next(state);

      expect(storeCall.value).toEqual(call(storePrompt, state));
    });

  });

  describe('handle prompt init', () => {

    it('does nothing if discard was at least two weeks ago', () => {
      const promptDiscardHandler = handlePromptInit();

      // get the state from local storage
      promptDiscardHandler.next();

      const ret = promptDiscardHandler.next({discardedAt: LastYear});

      expect(ret.value).toBe(undefined);
    });

    it('dispatches a discardPrompt action if discard was within the last two weeks', () => {
      mockReturnValueOfIsAfter = true;
      const promptDiscardHandler = handlePromptInit();

      // get the state from local storage
      promptDiscardHandler.next();

      const dispatch = promptDiscardHandler.next({discardedAt: TwoHoursAgo});

      expect(dispatch.value).toEqual(put(discardPrompt(TwoHoursAgo)));
    });

  });

});