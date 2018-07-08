import { SPLITS_RECEIVED, fetchSplits } from 'actions/splits-actions'
import { SplitRecord } from 'src/model'
import { List } from 'immutable'
import configureMockStore from 'redux-mock-store'
import moment from 'moment'
import moxios from 'moxios'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetchSplits', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should create an SPLITS_RECEIVED when request succeed', (done) => {
    const store = mockStore({})
    store.dispatch(fetchSplits(moment(), moment()))

    const response = {
      status: 200,
      response: [
        {
          id: 16850,
          account_id: 364,
          deal_id: 8423,
          position: "debit",
          value: "1124.11",
          date: "2017-09-22"
        }
      ]
    }

    function assertions() {
      const splits = List.of(
        new SplitRecord({
          id: 16850,
          account_id: 364,
          deal_id: 8423,
          position: "debit",
          value: 1124.11,
          date: moment.utc("2017-09-22"),
        })
      )
      const actions = store.getActions()
      expect(actions).toHaveLength(1)
      expect(actions[0].type).toEqual(SPLITS_RECEIVED)
      expect(actions[0].receivedAt).toBeInstanceOf(moment)
      expect(actions[0].payload.splits).toEqual(splits)
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
