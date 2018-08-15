self.addEventListener('install', () => {
  console.log('install');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('activate');
});

self.addEventListener('fetch', event => {
  console.log(event.request.url);
});

self.addEventListener('push', event => {
  let content = event.data.json();
  console.log(content);
  const title = content.notification.title;
  const options = {
    body: content.notification.body,
    icon: '/logo/logo192x192.png'
  }

  self.registration.showNotification(title, options);

});