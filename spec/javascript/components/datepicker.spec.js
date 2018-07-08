import DatePicker from 'components/datepicker'
import moment from 'moment'

describe('DatePicker', () => {

  const startDate = moment.utc('2017-07-12T00:00:00.000+00:00')
  const endDate = moment.utc('2018-03-02T00:00:00.000+00:00')

  it('render the component', () => {
    const component = shallow(<DatePicker startDate={ startDate } endDate={ endDate } />)
    expect(component.html()).toMatchSnapshot()
  })

  it('change start date on calendar click', () => {
    const component = mount(<DatePicker startDate={ startDate } endDate={ endDate } />)
    const input = component.find('.datepicker-input').first()
    input.simulate('click')

    const overlayTrigger = component.find('.datepicker-overlay').first()
    const popover = mount(overlayTrigger.props().overlay)
    popover.find('.calendar-start .unselected').first().simulate('click')

    expect(component.state().startDate).toEqualMoment('2017-06-25T00:00:00.000+00:00')
    expect(component.state().endDate).toEqualMoment('2018-03-02T00:00:00.000+00:00')
    expect(input.instance().props.value).toEqual('June 25, 2017 - March 2, 2018')
  })

  it('change end date on calendar click', () => {
    const component = mount(<DatePicker startDate={ startDate } endDate={ endDate } />)
    const input = component.find('.datepicker-input').first()
    input.simulate('click')

    const overlayTrigger = component.find('.datepicker-overlay').first()
    const popover = mount(overlayTrigger.props().overlay)
    popover.find('.calendar-end .unselected').last().simulate('click')

    expect(component.state().startDate).toEqualMoment('2017-07-12T00:00:00.000+00:00')
    expect(component.state().endDate).toEqualMoment('2018-04-07T00:00:00.000+00:00')
    expect(input.instance().props.value).toEqual('July 12, 2017 - April 7, 2018')
  })

  it('do not allow overlap', () => {
    const start = moment('2017-01-15')
    const end = moment('2017-01-15')
    const component = mount(<DatePicker startDate={ start } endDate={ end } />)
    const input = component.find('.datepicker-input').first()
    input.simulate('click')

    const overlayTrigger = component.find('.datepicker-overlay').first()
    const popover = mount(overlayTrigger.props().overlay)
    popover.find('.calendar-start .unselected').last().simulate('click')
    popover.find('.calendar-end .unselected').first().simulate('click')

    expect(component.state().startDate).toEqualMoment(start)
    expect(component.state().endDate).toEqualMoment(end)
  })

  it('notify date changes on popover exit', () => {
    const onDateChange = sinon.spy()
    const component = mount(<DatePicker startDate={ startDate } endDate={ endDate } onDateChange={ onDateChange } />)
    const input = component.find('.datepicker-input').first()
    input.simulate('click')
    input.simulate('click')

    expect(onDateChange.callCount).toEqual(1)
    expect(onDateChange.firstCall.args[0]).toEqualMoment(startDate)
    expect(onDateChange.firstCall.args[1]).toEqualMoment(endDate)
  })

  it('update the state from props', () => {
    const component = mount(<DatePicker startDate={ startDate } endDate={ endDate } />)
    component.setProps({ startDate: moment(endDate), endDate })
    expect(component.state().startDate).toEqualMoment(endDate)
  })
})
