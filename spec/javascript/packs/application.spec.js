import Application from 'packs/application'
import {Set} from 'immutable'
import {splitFix} from '../support/fixtures'
import moment from 'moment'

describe('Application', () => {

  const api = {
    splits: {
      list: sinon.stub().returns(Promise.resolve(Set([splitFix]))),
    },
    accounts: {
      list: sinon.stub().returns(Promise.resolve(Set()))
    }
  }

  it('render the component', () => {
    const wrapper = shallow(<Application api={api}/>)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('update splits according to date range', () => {
    const startDate = moment.utc('2017-09-11T00:00:00.000+00:00')
    const endDate = moment.utc('2018-01-07T00:00:00.000+00:00')

    const wrapper = mount(<Application api={api} />)
    wrapper.instance()._onDateChange(startDate, endDate)
    expect(api.splits.list.callCount).toEqual(3)
    process.nextTick(() => {
      const {startDate, endDate, splits} = wrapper.state()
      expect(splits).toEqualImmutable(Set([splitFix]))
      expect(startDate).toEqualMoment(startDate)
      expect(endDate).toEqualMoment(endDate)
    })
  })
})
