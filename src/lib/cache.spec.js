import { clearCaches, fillStaticCache, tryGetFromStaticCache, fetchAndStoreInDynamicCache } from "./cache";

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

  describe('tryGetFromStaticCache', () => {
    it('matches request', async () => {
      const request = 'my request';
      const mockStaticCache = {
        match: jest.fn(() => 'cached request')
      },
      mockCaches = {
        open: jest.fn(() => mockStaticCache)
      };

      await tryGetFromStaticCache(mockCaches, request);

      expect(mockStaticCache.match).toBeCalledWith(request);
    });

    it('returns cached request', async () => {
      const cachedRequest = 'cached request';
      const mockStaticCache = {
        match: jest.fn(() => cachedRequest)
      },
      mockCaches = {
        open: jest.fn(() => mockStaticCache)
      };

      let returnValue = await tryGetFromStaticCache(mockCaches, 'my request');

      expect(returnValue).toBe(cachedRequest);
    });
  });

  describe('fetchAndStoreInDynamicCache', () => {
    it('adds response to cache if it is ok', async () => {
      const request = 'my request';
      const response = 'my response';
      const dynamicCacheMock = {
        put: jest.fn()
      },
      cachesMock = {
        open: jest.fn(() => dynamicCacheMock)
      };
      fetch.mockResponse(response);

      await fetchAndStoreInDynamicCache(cachesMock, request);

      expect(dynamicCacheMock.put.mock.calls[0][1]._bodyText).toBe(response);
    });

    it('returns received response', async () => {
      const request = 'my request';
      const response = 'my response';
      const dynamicCacheMock = {
        put: jest.fn()
      },
      cachesMock = {
        open: jest.fn(() => dynamicCacheMock)
      };
      fetch.mockResponseOnce(response);

      let returnValue = await fetchAndStoreInDynamicCache(cachesMock, request);

      expect(returnValue._bodyText).toBe(response);
    });

    it('does not add response to cache if it is not ok', async () => {
      const request = 'my request';
      const response = 'my response';
      const dynamicCacheMock = {
        put: jest.fn()
      },
      cachesMock = {
        open: jest.fn(() => dynamicCacheMock)
      };
      fetch.mockResponse(response, {status: 503});

      await fetchAndStoreInDynamicCache(cachesMock, request);

      expect(dynamicCacheMock.put).toHaveBeenCalledTimes(0);
    });
  });
});