import * as utils from 'support/date_utils'
import { List } from 'immutable'
import moment from 'moment'

describe('DateUtils', () => {

  describe('range', () => {

    it('generate a list with months covering two dates', () => {
      const startDate = moment.utc('2017-11-13T00:00:00.000-03:00')
      const endDate = moment.utc('2018-02-25T00:00:00.000-03:00')
      const actual = utils.range(startDate, endDate, 'month').map(x => x.toDate())
      const expected = List.of(
        moment.utc('2017-11-01T00:00:00.000+00:00'),
        moment.utc('2017-12-01T00:00:00.000+00:00'),
        moment.utc('2018-01-01T00:00:00.000+00:00'),
        moment.utc('2018-02-01T00:00:00.000+00:00')
      ).map(x => x.toDate())
      expect(actual).toEqual(expected)
    })

    it('generate a list with quarters covering two dates', () => {
      const startDate = moment.utc('2016-11-13T00:00:00.000-03:00')
      const endDate = moment.utc('2018-02-25T00:00:00.000-03:00')
      const actual = utils.range(startDate, endDate, 'quarter').map(x => x.toDate())
      const expected = List.of(
        moment.utc('2016-10-01T00:00:00.000+00:00'),
        moment.utc('2017-01-01T00:00:00.000+00:00'),
        moment.utc('2017-04-01T00:00:00.000+00:00'),
        moment.utc('2017-07-01T00:00:00.000+00:00'),
        moment.utc('2017-10-01T00:00:00.000+00:00'),
        moment.utc('2018-01-01T00:00:00.000+00:00')
      ).map(x => x.toDate())
      expect(actual).toEqual(expected)
    })

    it('throw exception when endDate > startDate', () => {
      const startDate = moment.utc('2019-11-13T00:00:00.000-03:00')
      const endDate = moment.utc('2018-02-25T00:00:00.000-03:00')
      const actual = () => utils.range(startDate, endDate, 'month')
      expect(actual).toThrow()
    })
  })
})
