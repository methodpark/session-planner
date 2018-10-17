function clearCache(caches, cacheName) {
  caches.delete(cacheName);
}

export async function clearCaches(/* CacheStorage */ caches) {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(cacheName => clearCache(caches, cacheName)));
}