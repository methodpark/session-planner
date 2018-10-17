import { clearCaches, fillStaticCache } from "./cache";

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
  });

  describe('fillStaticCache', () => {
    it('fills the static cache', async () => {
      const mockStaticCache = {
          addAll: jest.fn()
        },
        mockCaches = {
          open: jest.fn(() => mockStaticCache)
        };

        await fillStaticCache(mockCaches, []);

        const expectedResources = [];
        expect(mockStaticCache.addAll).toBeCalledWith(expectedResources);
    });

    it('fills the static cache with content', async () => {
      const mockStaticCache = {
          addAll: jest.fn()
        },
        mockCaches = {
          open: jest.fn(() => mockStaticCache)
        };
        const resources = ['index.html', '🍳.css'];

        await fillStaticCache(mockCaches, resources);

        expect(mockStaticCache.addAll).toBeCalledWith(resources);
    });
  });
});