const { isTimeInsideOfTimeInterval } = require('./notificationTimeFilter');
const moment = require('moment');

describe('notificationTimeFilter ', () => {
  describe('with empty time intervall ', () => {   
    it('and valid time should return false', () => {
      const timeIntervals = [];
      const time = moment().year(2018).month(11).day(18).hour(10).minute(30);

      expect(isTimeInsideOfTimeInterval(time, timeIntervals)).toBeFalsy;
    })
  })

  describe('with valid time intervalls ', () => {    
    it('and time is at the begin of intervall should return true', () => {
      const timeIntervals = [{
        "start": "2018-11-17T11:00:00.000Z",
        "end": "2018-11-17T18:00:00.000Z"
      },
      {
        "start": "2018-11-18T10:30:00.000Z",
        "end": "2018-11-18T18:00:00.000Z"
      }]
      const time = moment().year(2018).month(11).day(18).hour(10).minute(30);

      expect(isTimeInsideOfTimeInterval(time, timeIntervals)).toBeTruthy;
    })

    it('and time is at the end of intervall should return true', () => {
      const timeIntervals = [{
        "start": "2018-11-17T11:00:00.000Z",
        "end": "2018-11-17T18:00:00.000Z"
      },
      {
        "start": "2018-11-18T10:30:00.000Z",
        "end": "2018-11-18T18:00:00.000Z"
      }]
      const time = moment().year(2018).month(11).day(18).hour(17).minute(59);

      expect(isTimeInsideOfTimeInterval(time, timeIntervals)).toBeTruthy;
    })
    it('and time is before time intervall should return false', () => {
      const timeIntervals = [{
        "start": "2018-11-17T11:00:00.000Z",
        "end": "2018-11-17T18:00:00.000Z"
      },
      {
        "start": "2018-11-18T10:30:00.000Z",
        "end": "2018-11-18T18:00:00.000Z"
      }]
      const time = moment().year(2018).month(11).day(18).hour(10).minute(29);

      expect(isTimeInsideOfTimeInterval(time, timeIntervals)).toBeFalsy;
    })

    it('and time is after time intervall should return false', () => {
      const timeIntervals = [{
        "start": "2018-11-17T11:00:00.000Z",
        "end": "2018-11-17T18:00:00.000Z"
      },
      {
        "start": "2018-11-18T10:30:00.000Z",
        "end": "2018-11-18T18:00:00.000Z"
      }]
      const time = moment().year(2018).month(11).day(18).hour(18).minute(1);

      expect(isTimeInsideOfTimeInterval(time, timeIntervals)).toBeFalsy;
    })
  })


})
