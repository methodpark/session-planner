export function isPushApiSupported() {
  return 'PushManager' in window;
}