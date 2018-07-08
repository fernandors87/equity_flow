import Calendar from 'components/calendar'
import moment from 'moment'

describe('Calendar', () => {

  const date = moment.utc('2017-07-12T00:00:00.000+00:00')

  it('render the component', () => {
    const component = shallow(<Calendar date={ date } />)
    expect(component.html()).toMatchSnapshot()
  })

  it('change calendar to previous month', () => {
    const component = mount(<Calendar date={ date } />)
    component.find('.prev-month').first().simulate('click')
    expect(component.html()).toMatchSnapshot()
  })

  it('change calendar to next month', () => {
    const component = mount(<Calendar date={ date } />)
    component.find('.next-month').first().simulate('click')
    expect(component.html()).toMatchSnapshot()
  })

  it('keep the calendar date state', () => {
    const component = mount(<Calendar date={ date } />)
    component.find('.unselected').first().simulate('click')
    expect(component.state().date).not.toEqualMoment(date)
  })

  it('notify date changes', () => {
    const onDateClick = sinon.spy()
    const component = mount(<Calendar date={ date } onDateClick={ onDateClick } />)
    component.find('.unselected').first().simulate('click')

    expect(onDateClick.callCount).toEqual(1)
    expect(onDateClick.lastCall.args[0]).toEqualMoment(moment.utc('2017-06-25T00:00:00.000+00:00'))
  })

  it('update the state from props', () => {
    const newDate = moment(date).add(1, 'month')
    const newMonth = moment(newDate).startOf('month')
    const component = shallow(<Calendar date={ date } />)
    component.instance().UNSAFE_componentWillReceiveProps({ date: newDate })
    const newState = component.state()
    expect(newState.date).toEqualMoment(newDate)
    expect(newState.month).toEqualMoment(newMonth)
  })
})
