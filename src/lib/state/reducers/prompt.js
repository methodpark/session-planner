import { createAction } from '../../../lib/util';

export const INIT_PROMPT = 'INIT_PROMPT';
export const DISCARD_PROMPT = 'DISCARD_PROMPT';

export function initPrompt() {
  return createAction(INIT_PROMPT, {});
}

export function discardPrompt(timestamp) {
  return createAction(DISCARD_PROMPT, { timestamp });
}

export function promptReducer(prompt = {}, action) {
  switch (action.type) {
    case DISCARD_PROMPT:
      return {
        discarded: true,
        discardedAt: action.timestamp
      };
    default:
      return prompt;
  }
}