import { ACCOUNTS_RECEIVED, fetchAccounts } from 'actions/accounts-actions'
import { AccountRecord } from 'src/model'
import { List } from 'immutable'
import configureMockStore from 'redux-mock-store'
import moment from 'moment'
import moxios from 'moxios'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetchAccounts', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should create an ACCOUNTS_RECEIVED when request succeed', (done) => {
    const store = mockStore({})
    store.dispatch(fetchAccounts())

    const response = {
      status: 200,
      response: [
        {
          id: 1,
          name: 'name',
          description: 'desc',
          type: 'income',
          level: 1,
          parent_id: 0,
          full_name: 'full_name'
        }
      ]
    }

    function assertions() {
      const accounts = List.of(
        new AccountRecord({
          id: 1,
          name: 'name',
          description: 'desc',
          type: 'income',
          level: 1,
          parent_id: 0,
          full_name: 'full_name',
          children: List()
        })
      )
      const actions = store.getActions()
      expect(actions).toHaveLength(1)
      expect(actions[0].type).toEqual(ACCOUNTS_RECEIVED)
      expect(actions[0].receivedAt).toBeInstanceOf(moment)
      expect(actions[0].payload.accounts).toEqual(accounts)
      done()
    }

    moxios.wait(() => {
      moxios.requests
        .mostRecent()
        .respondWith(response)
        .then(assertions)
    })
  })
})
