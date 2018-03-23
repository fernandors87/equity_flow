import * as Immutable from 'immutable'
import moment from 'moment'

function toEqualImmutable(actual, expected) {
  const pass = Immutable.is(actual, expected)
  const notWord = pass ? ' not ' : ' '
  const message = () => `expected ${actual}${notWord}to be equal to ${expected}`
  return { pass, message }
}

function toEqualMoment(actual, expected) {
  const pass = actual.isSame(moment(expected))
  const message = () => {
    const act = actual.toString()
    const exp = expected.toString()
    const not = pass ? ' not ' : ' '
    return `expected ${act}${not}to be equal to ${exp}`
  }
  return { pass, message }
}

expect.extend({ toEqualImmutable, toEqualMoment })
