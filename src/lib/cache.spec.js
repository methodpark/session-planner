import { clearCaches } from "./cache";

describe('cache', () => {
  describe('clearCaches', () => {
    it('calls delete for the cache', async () => {
      const mockCaches = {
        keys: () => ['awesomeCache'],
        delete: jest.fn()
      };

      await clearCaches(mockCaches);

      const expectedCacheName = 'awesomeCache';
      expect(mockCaches.delete).toBeCalledWith(expectedCacheName);
    });

    it('calls delete for all caches', async () => {
      const mockCaches = {
        keys: () => ['awesomeCache', 'mikesCache'],
        delete: jest.fn()
      };

      await clearCaches(mockCaches);

      const expectedCacheNames = mockCaches.keys().map(v => [v]);
      expect(mockCaches.delete.mock.calls).toEqual(expectedCacheNames);
    });
  })
});