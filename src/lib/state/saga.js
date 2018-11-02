import { watchActiveSessions } from './sagas/activeSession';

export default function* () {
  yield watchActiveSessions();
}
