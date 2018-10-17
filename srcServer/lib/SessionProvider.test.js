const path = require('path');

const SessionProvider = require('./SessionProvider');

describe('SessionProvider', () => {
  const sessionProvider = new SessionProvider(path.join(__dirname, '../../testData'));

  describe('validation', () => {
    it('should throw on null', () => {
      expect(() => {
        sessionProvider._validate(null);
      }).toThrow('must be an array');
    });

    it('should throw if array is empty', () => {
      expect(() => {
        sessionProvider._validate([]);
      }).toThrow('can not be empty');
    });

    it('should return [1,2,3] ', () => {
      expect(sessionProvider._validate([1,2,3])).toEqual([1,2,3]);
    });
  });

  describe('getSessions', () => {
    it('should return [1,2,3] from test file', async() => {
      expect(await sessionProvider.getSessions() ).toEqual([1,2,3]);
    });
  });

});