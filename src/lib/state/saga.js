import { watchActiveSessions } from './sagas/activeSession';
import { watchFavorites } from './sagas/favorites';
import { watchPromptGetDiscarded, watchPromptGetInitialized } from './sagas/prompt';

export default function* () {
  yield [
    watchActiveSessions(),
    watchFavorites(),
    watchPromptGetDiscarded(),
    watchPromptGetInitialized()
  ]
}
