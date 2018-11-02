import { watchActiveSessions } from './sagas/activeSession';
import { watchFavorites } from './sagas/favorites';

export default function* () {
  yield [
    watchActiveSessions(),
    watchFavorites()
  ]
}
