import MonthlyExpenses, { Body, Footer, Header, Row } from 'components/monthly_expenses'
import Account from 'models/account'
import { List } from 'immutable'
import Split from 'models/split'
import moment from 'moment'

describe('MonthlyExpenses', () => {

  const accounts = List.of(
    Account({ id: 2, name: 'a2', type: 'expense' }),
    Account({ id: 1, name: 'a1', type: 'expense' }),
    Account({ id: 3, name: 'a3', type: 'income' })
  )

  const months = List.of(moment.utc('2017-01-01'), moment.utc('2017-03-01'))

  const splits = List.of(
    Split({ id: 1, date: moment.utc('2017-01-01'), value: 11.6 }),
    Split({ id: 2, date: moment.utc('2017-01-31'), value: 12.6 }),
    Split({ id: 3, date: moment.utc('2017-02-15'), value: 13.6 }),
    Split({ id: 4, date: moment.utc('2017-03-01'), value: 14.6 }),
    Split({ id: 5, date: moment.utc('2017-03-30'), value: 15.6 })
  )

  describe('Header', () => {

    it('render the fragment', () => {
      const wrapper = shallow(<Header months={ months } />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Body', () => {

    it('render the fragment', () => {
      const wrapper = shallow(<Body accounts={ accounts } months={ months } splits={ splits } />)
      expect(wrapper).toMatchSnapshot()
    })

    it('render rows for each account', () => {
      const wrapper = shallow(<Body accounts={ accounts } />)
      const actual = wrapper.find('Row')
      expect(actual.length).toEqual(3)
    })

    it('sort the accounts in alphabetical order', () => {
      const wrapper = shallow(<Body accounts={ accounts } />)
      const actual = wrapper.find('Row').map(x => x.props().label)
      expect(actual).toEqual(['a1', 'a2', 'a3'])
    })
  })

  describe('Row', () => {

    it('render the fragment', () => {
      const wrapper = shallow(<Row label="Blah" months={ months } splits={ splits } />)
      expect(wrapper).toMatchSnapshot()
    })

    it('group splits into the given months', () => {
      const wrapper = shallow(<Row label="Blah" months={ months } splits={ splits } />)
      const actual = wrapper.find('.value').map(x => x.props().children)
      expect(actual).toEqual(['24', '30'])
    })

    it('calculate totals', () => {
      const wrapper = shallow(<Row label="Blah" months={ months } splits={ splits } />)
      const total = wrapper.find('.total').text()
      const avg = wrapper.find('.avg').text()
      expect(total).toEqual('68')
      expect(avg).toEqual('34')
    })
  })

  describe('Footer', () => {

    it('render the fragment', () => {
      const wrapper = shallow(<Footer months={ months } splits={ splits } />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('MonthlyExpenses', () => {

    it('render the component', () => {
      const startDate = moment.utc('2018-03-01')
      const endDate = moment.utc('2018-04-15')
      const wrapper = shallow(<MonthlyExpenses accounts={ accounts } splits={ splits } startDate={ startDate } endDate={ endDate } />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
