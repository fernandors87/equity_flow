import * as Immutable from 'immutable'

export function toEqualImmutable(actual, expected) {
  const pass = Immutable.is(actual, expected)
  const notWord = pass ? ' not ' : ' '
  const message = () => `expected ${actual}${notWord}to be equal to ${expected}`
  return {pass, message}
}
