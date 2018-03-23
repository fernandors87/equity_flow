import { List } from 'immutable'
import moment from 'moment'

export function range(startDate, endDate, period) {
  if (startDate.isAfter(endDate)) {
    throw `startDate(${startDate}) must not be greater than endDate(${endDate})`
  }

  const startOfPeriod = moment(startDate).startOf(period)
  const endOfPeriod = moment(endDate).endOf(period)
  const generateRange = (acc) => {
    const lastProcessed = acc.last()
    const plusOne = moment(lastProcessed).add(1, period)
    return plusOne.isBefore(endOfPeriod) ? generateRange(acc.push(plusOne)) : acc
  }
  return generateRange(List.of(startOfPeriod))
}

export function utc(date) {
  return moment.utc(date).utcOffset(0, true)
}
