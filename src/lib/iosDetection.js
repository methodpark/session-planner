export function isIOsDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

export function isInStandaloneMode() {
  return ('standalone' in window.navigator) && (window.navigator.standalone);
}