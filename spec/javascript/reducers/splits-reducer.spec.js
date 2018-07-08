import { List } from 'immutable'
import { SPLITS_RECEIVED } from 'actions/splits-actions'
import Split from 'models/split'
import splitsReducer from 'reducers/splits-reducer'

it('should return the default state', () => {
  const actual = splitsReducer(undefined, {})
  const expected = {}
  expect(actual).toEqual(expected)
})

it('should handle SPLITS_RECEIVED', () => {
  const action = {
    type: SPLITS_RECEIVED,
    payload: {
      accounts: List(new Split())
    }
  }

  const expected = action.payload.splits
  const actual = splitsReducer(undefined, action)
  expect(actual).toEqual(expected)
})
