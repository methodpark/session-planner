export function isIOsDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
  return isIosDevice;
}

export function isNonSafariOnIos() {
  const isNonSafari = / ..iOS/.test(window.navigator.userAgent);
  return isNonSafari;
}

export function isInStandaloneMode() {
  return ('standalone' in window.navigator) && (window.navigator.standalone);
}