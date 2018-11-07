export function interceptRequest(url, callback) {
  var networkDataReceived = false;

  // fetch fresh data
  var networkUpdate = fetch(url)
    .then(function (data) {
      networkDataReceived = true;
      callback(data);
    });

  // fetch cached data
  Promise.resolve(window.caches).then((caches)=> {
    if(!caches) {
      throw Error("No cache");
    }
    return caches.match(url);
  }).then(function (response) {
    if (!response) throw Error("No data");
    return response;
  }).then(function (data) {
    // don't overwrite newer network data
    if (!networkDataReceived) {
      callback(data);
    }
  }).catch(function () {
    // we didn't get cached data, the network is our last hope:
    return networkUpdate;
  }).catch(showErrorMessage);
}

const showErrorMessage = (msg) => console.warn(msg);
