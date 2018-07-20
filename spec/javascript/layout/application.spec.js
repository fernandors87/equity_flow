import Application from 'layout/application'
import Chrono from 'models/chrono'
import { List } from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const states = {
  accounts: List(),
  chrono: new Chrono('2017-09-11', '2018-01-07'),
  splits: List(),
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(states)

it('should render the component', () => {
  const wrapper = mount(
    <Provider store={ store }>
      <Application />
    </Provider>
  )

  expect(wrapper.html()).toMatchSnapshot()
})
