import moment from 'moment';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { INIT_PROMPT, DISCARD_PROMPT, discardPrompt } from '../state';
import { loadPrompt, storePrompt } from '../../localStorage';

export function* watchPromptGetDiscarded() {
  yield takeLatest(DISCARD_PROMPT, handlePromptDiscard);
}

export function* handlePromptDiscard() {
  const prompt = yield select(state => state.prompt);
  yield call(storePrompt, prompt);
}

export function* watchPromptGetInitialized() {
  yield takeLatest(INIT_PROMPT, handlePromptInit);
}

export function* handlePromptInit() {
  const { discardedAt } = yield call(loadPrompt);

  if (discardedAt === undefined) {
    return;
  }

  const timestamp = moment(discardedAt);
  const twoWeeksAgo = moment().subtract(2, 'weeks');

  if (timestamp.isAfter(twoWeeksAgo)) {
    yield put(discardPrompt(discardedAt));
  }
}