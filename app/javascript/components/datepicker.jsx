import '../css/datepicker.scss'
import { FormControl, FormGroup, Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap'
import Calendar from './calendar'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

function DatePickerPopover({ startDate, endDate, onDateChange }) {
  const onDateChangeFn = (variable) => (date) => onDateChange({ [variable]: date })
  return (
    <Popover className="datepicker-popover" id="datepicker-popover">
      <Calendar className="calendar-start" date={ startDate } onDateClick={ onDateChangeFn('startDate') }/>
      <Calendar className="calendar-end" date={ endDate } onDateClick={ onDateChangeFn('endDate') }/>
    </Popover>
  )
}

function DatePickerInput({ container, startDate, endDate }) {
  const dateFormat = 'LL'
  const value = `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}`
  return <FormControl className="datepicker-input" type="text" readOnly container={ container } value={ value } />
}

export default class DatePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate
    }
    this._onDateChange = this._onDateChange.bind(this)
    this._onPopoverExit = this._onPopoverExit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startDate: nextProps.startDate,
      endDate: nextProps.endDate
    })
  }

  _onDateChange({ startDate, endDate }) {
    this.setState(prevState => {
      const prevStart = prevState.startDate
      const prevEnd = prevState.endDate
      const startChanged = startDate && startDate.isSameOrBefore(prevEnd, 'day')
      const endChanged = endDate && endDate.isSameOrAfter(prevStart, 'day')
      return {
        startDate: startChanged ? startDate : prevStart,
        endDate: endChanged ? endDate : prevEnd
      }
    })
  }

  _onPopoverExit() {
    const { startDate, endDate } = this.state
    const callback = this.props.onDateChange || (() => {})
    callback(startDate, endDate)
  }

  render() {
    const { startDate, endDate } = this.state
    const popover = DatePickerPopover({ startDate, endDate, onDateChange: this._onDateChange })

    return (
      <FormGroup className="datepicker">
        <OverlayTrigger
          rootClose
          className="datepicker-overlay"
          trigger="click"
          placement="bottom"
          overlay={ popover }
          onExiting={ this._onPopoverExit }>
          <div>
            <DatePickerInput container={ this } startDate={ startDate } endDate={ endDate }/>
            <FormControl.Feedback>
              <Glyphicon glyph="calendar" />
            </FormControl.Feedback>
          </div>
        </OverlayTrigger>
      </FormGroup>
    )
  }
}

DatePicker.propTypes = {
  startDate: PropTypes.instanceOf(moment).isRequired,
  endDate: PropTypes.instanceOf(moment).isRequired,
  onDateChange: PropTypes.func
}
