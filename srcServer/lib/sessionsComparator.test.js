const sessionComparator = require('./sessionsComparator');

describe('sessionComparer', () => {
  it('should return empty change list on empty session list', () => {
    const oldList = [];
    const newList = [];
    const expectedResult = [];

    expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
  });

  it('should return empty change list on identical session list', () => {
    const oldList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
    const newList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
    const expectedResult = [];

    expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
  })

  it('should return the input new session list when old session list is empty', () => {
    const oldList = [];
    const newList = [{ id: 0, title: "newTitle", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
    const expectedResult = [{ what: 'NEW', message: 'newSession', session: newList[0] }]

    expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
  });

  it('should return the old session when a session has been deleted', () => {
    const oldList = [{ id: 0, title: "newTitle", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
    const newList = [];
    const expectedResult = [{ what: 'DELETED', message: 'deletedSession', session: oldList[0] }]

    expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
  });

  describe('should return a list with a change', () => {

    it('when a sessions title is different', () => {
      const oldList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const newList = [{ id: 0, title: "newTitle", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const expectedResult = [{ what: 'CHANGE', message: 'titleChange', session: newList[0] }]

      expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
    });

    it('when a sessions host is different', () => {
      const oldList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const newList = [{ id: 0, title: "a", host: "newhost", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const expectedResult = [{ what: 'CHANGE', message: 'hostChange', session: newList[0] }]

      expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
    });

    it('when a sessions room is different', () => {
      const oldList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const newList = [{ id: 0, title: "a", host: "a", room: "newRoom", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const expectedResult = [{ what: 'CHANGE', message: 'roomChange', session: newList[0] }]

      expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
    });

    it('when a sessions start is different', () => {
      const oldList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const newList = [{ id: 0, title: "a", host: "a", room: "a", start: "2019-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const expectedResult = [{ what: 'CHANGE', message: 'startChange', session: newList[0] }]

      expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
    });

    it('when a sessions end is different', () => {
      const oldList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" }];
      const newList = [{ id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2019-01-01T10:00:00+01:00" }];
      const expectedResult = [{ what: 'CHANGE', message: 'endChange', session: newList[0] }]

      expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
    });

  })  

  it('should return multiple differences', () => {
    const oldList = [
      { id: 0, title: "a", host: "a", room: "a", start: "2018-01-01T08:00:00+01:00", end: "2018-01-01T10:00:00+01:00" },
      { id: 1, title: "b", host: "b", room: "b", start: "2018-01-01T10:00:00+01:00", end: "2018-01-01T12:00:00+01:00" },
      { id: 2, title: "c", host: "c", room: "c", start: "2018-01-01T12:00:00+01:00", end: "2018-01-01T14:00:00+01:00" }
    ];

    const newList = [
      { id: 1, title: "b", host: "b", room: "b", start: "2018-01-01T10:00:00+01:00", end: "2018-01-01T12:00:00+01:00" },
      { id: 2, title: "cX", host: "c", room: "c", start: "2018-01-01T12:00:00+01:00", end: "2018-01-01T14:00:00+01:00" },
      { id: 3, title: "d", host: "d", room: "d", start: "2018-01-01T12:00:00+01:00", end: "2018-01-01T14:00:00+01:00" }
    ];

    const expectedResult = [
      { what: 'CHANGE', message: 'titleChange', session: newList[1] },
      { what: 'NEW', message: 'newSession', session: newList[2] },
      { what: 'DELETED', message: 'deletedSession', session: oldList[0] }
    ];

    expect(sessionComparator(oldList, newList)).toEqual(expectedResult);
  });
});