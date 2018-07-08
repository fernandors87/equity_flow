import { UPDATE_CHRONO, updateChrono } from 'actions/chrono-actions'
import Chrono from 'models/chrono'
import configureMockStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureMockStore(middlewares)

describe('updateChrono', () => {

  it('should create an UPDATE_CHRONO when a new date range is received', () => {
    const store = mockStore({})
    store.dispatch(updateChrono('2018-01-01', '2018-01-10'))

    const expectedAction = {
      type: UPDATE_CHRONO,
      payload: {
        chrono: new Chrono('2018-01-01', '2018-01-10')
      }
    }
    expect(store.getActions()).toEqual([expectedAction])
  })
})
