const path = require('path');

const SessionProvider = require('./SessionProvider');

describe('SessionProvider', () => {
  let sessionProvider = null;
  beforeAll(done => {
    sessionProvider = new SessionProvider(path.join(__dirname, '../../testData/sessionsData.json'));

    sessionProvider.on('initialized', done);
  });

  describe('validation', () => {
    it('should throw on null', () => {
      const input = null;
      const expectedErrorMessage = 'must be an array';

      expect(() => sessionProvider._validate(input)).toThrow(expectedErrorMessage);
    });

    it('should throw if array is empty', () => {
      const input = [];
      const expectedErrorMessage = 'can not be empty';

      expect(() => sessionProvider._validate(input)).toThrow(expectedErrorMessage);
    });

    it('should return [1,2,3] ', () => {
      const input = [1, 2, 3];
      const expectedResult = input;

      expect(sessionProvider._validate(input)).toEqual(expectedResult);
    });
  });

  describe('getSessions', () => {
    it('should return [1,2,3] from test file', async () => {
      const expectedResult = [1, 2, 3];

      expect(await sessionProvider.getSessions()).toEqual(expectedResult);
    });
  });

});