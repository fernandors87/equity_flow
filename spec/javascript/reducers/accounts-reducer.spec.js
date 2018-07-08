import { ACCOUNTS_RECEIVED } from 'actions/accounts-actions'
import Account from 'models/account'
import { List } from 'immutable'
import accountsReducer from 'reducers/accounts-reducer'

it('should return the default state', () => {
  const actual = accountsReducer(undefined, {})
  const expected = {}
  expect(actual).toEqual(expected)
})

it('should handle ACCOUNTS_RECEIVED', () => {
  const action = {
    type: ACCOUNTS_RECEIVED,
    payload: {
      accounts: List(Account({}))
    }
  }

  const expected = action.payload.accounts
  const actual = accountsReducer(undefined, action)
  expect(actual).toEqual(expected)
})
