import '../css/calendar.scss'
import { Button, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Range } from 'immutable'
import React from 'react'
import moment from 'moment'

export default class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      date: props.date,
      month: moment(props.date).startOf('month')
    }

    this._onDateClick = this._onDateClick.bind(this)
    this._onMonthChange = this._onMonthChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { date } = nextProps
    const month = moment(date).startOf('month')
    this.setState({ date, month })
  }

  _onDateClick(date) {
    const { onDateClick } = this.props
    if (onDateClick) {
      onDateClick(date)
    } else {
      const month = moment(date).startOf('month')
      this.setState({ date, month })
    }
  }

  _onMonthChange(offset) {
    this.setState(prevState => ({ month: moment(prevState.month).add(offset, 'month') }))
  }

  render() {
    const { date, month } = this.state
    const { className } = this.props

    const shortMonth = month.format('YYYY-MM')

    const weekNames = moment.weekdaysMin()
      .map(w => w[0].toUpperCase())
      .map((w, i) => <td key={ i }>{w}</td>)

    const startOfCalendar = moment(month).startOf('week')
    const calendarDates = Range(0, 42).map(i => moment(startOfCalendar).add(i, 'days'))
    const calendarDatesByWeek = calendarDates.groupBy(d => d.week())
    const calendarCellsByWeek = calendarDatesByWeek.map(dates => dates.map((calendarDate) => {
        const key = calendarDate.toString()
        const CellCss = 'day'
        const onClick = () => this._onDateClick(calendarDate)
        const buttonCss = calendarDate.isSame(date, 'day') ? 'selected' : 'unselected'
        const buttonStyle = buttonCss === 'selected' ? 'primary' : 'default'
        const button = <Button className={ buttonCss } bsStyle={ buttonStyle }>{calendarDate.date()}</Button>
        return <td key={ key } className={ CellCss } onClick={ onClick }>{button}</td>
      })).valueSeq()

    const calendarRows = calendarCellsByWeek.map((cells, i) => <tr key={ i }>{cells}</tr>)

    return (
      <table className={ `calendar ${className}` }>
        <thead>
          <tr>
            <td>
              <Button className="prev-month" onClick={ () => this._onMonthChange(-1) }>
                <Glyphicon glyph="triangle-left" />
              </Button>
            </td>
            <td colSpan="5">{shortMonth}</td>
            <td>
              <Button className="next-month" onClick={ () => this._onMonthChange(1) }>
                <Glyphicon glyph="triangle-right" />
              </Button>
            </td>
          </tr>
          <tr>
            {weekNames}
          </tr>
        </thead>
        <tbody>
          {calendarRows}
        </tbody>
      </table>
    )
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  onDateClick: PropTypes.func,
  className: PropTypes.string
}
