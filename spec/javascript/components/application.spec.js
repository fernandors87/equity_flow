import { Application } from 'components/application'
import Chrono from 'models/chrono'
import { List } from 'immutable'

const chrono = new Chrono('2017-09-11T00:00:00.000+00:00', '2018-01-07T00:00:00.000+00:00')
const emptyAction = () => {}

it('should render the component', () => {
  const wrapper = mount(
    <Application
      accounts={ List() }
      chrono={ chrono }
      splits={ List() }
      fetchAccounts={ emptyAction }
      fetchSplits={ emptyAction }
      updateChrono={ emptyAction } />)

  expect(wrapper.html()).toMatchSnapshot()
})

it('should request remote accounts', () => {
  const accountsAction = sinon.stub()
  const splitsAction = sinon.stub()
  mount(
    <Application
      accounts={ List() }
      chrono={ chrono }
      splits={ List() }
      fetchAccounts={ accountsAction }
      fetchSplits={ splitsAction }
      updateChrono={ emptyAction } />)

  expect(accountsAction.callCount).toEqual(1)
  expect(splitsAction.callCount).toEqual(1)
})

describe('_onDateChange', () => {

  const chronoAction = sinon.stub().returns({ payload: { chrono } })

  it('should request remote splits', () => {
    const splitsAction = sinon.stub()
    const wrapper = mount(
      <Application
        accounts={ List() }
        chrono={ chrono }
        splits={ List() }
        fetchAccounts={ emptyAction }
        fetchSplits={ splitsAction }
        updateChrono={ chronoAction } />)

    wrapper.instance()._onDateChange(chrono.start, chrono.end)
    expect(splitsAction.callCount).toEqual(2)
  })

  it('should update the chrono', () => {
    const wrapper = mount(
      <Application
        accounts={ List() }
        chrono={ chrono }
        splits={ List() }
        fetchAccounts={ emptyAction }
        fetchSplits={ emptyAction }
        updateChrono={ chronoAction } />)

    wrapper.instance()._onDateChange(chrono.start, chrono.end)
    expect(chronoAction.callCount).toEqual(2)
  })
})
