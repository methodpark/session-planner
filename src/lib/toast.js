const toaster = {};

export function setPushRegistration(registration) {
  toaster.registration = registration;
}

export function toast(title, body, optional) {
  if (!toaster.registration) {
    return;
  }

  const options = {body, ...optional};
  toaster.registration.showNotification(title, options);
}
