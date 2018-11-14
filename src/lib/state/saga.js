import { watchActiveSessions } from './sagas/activeSession';
import { watchFavorites } from './sagas/favorites';
import { watchPromptGetDiscarded, watchPromptGetInitialized } from './sagas/prompt';
import { watchTheme } from './sagas/theme';
import { watchPushNotification } from './sagas/notify';

export default function* () {
  yield [
    watchActiveSessions(),
    watchFavorites(),
    watchPromptGetDiscarded(),
    watchPromptGetInitialized(),
    watchTheme(),
    watchPushNotification()
  ]
}
