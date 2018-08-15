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