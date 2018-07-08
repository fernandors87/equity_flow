import Chrono from 'models/chrono'
import moment from 'moment'

describe('constructor', () => {

  it('convert dates to UTC', () => {
    const period = new Chrono(moment(), moment())
    expect(period.start.creationData().isUTC).toBe(true)
    expect(period.end.creationData().isUTC).toBe(true)
  })

  it('cannot be created from non range dates', () => {
    const period = () =>
      new Chrono(
        moment().add(2, 'day'),
        moment().add(1, 'day'))
    expect(period).toThrowError('should not be greater than end date')
  })
})
