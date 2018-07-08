import Chrono from 'models/chrono'
import { UPDATE_CHRONO } from 'actions/chrono-actions'
import chronoReducer from 'reducers/chrono-reducer'

it('should return the default state', () => {
  const actual = chronoReducer(undefined, {})
  const expected = {}
  expect(actual).toEqual(expected)
})


it('should handle UPDATE_CHRONO', () => {
  const action = {
    type: UPDATE_CHRONO,
    payload: {
      chrono: new Chrono('2018-01-01', '2018-01-02')
    }
  }

  const expected = action.payload.chrono
  const actual = chronoReducer(undefined, action)
  expect(actual).toEqual(expected)
})
