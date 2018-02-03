import '../src/application.scss'
import * as API from './../src/api'
import Calendar from '../components/calendar'
import React from 'react'
import ReactDOM from 'react-dom'
import {Set} from 'immutable'
import TransactionSummary from './transaction_summary'
import moment from 'moment'

class Application extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: Set(),
      splits: Set(),
      startDate: moment.utc('2017-07-01T00:00:00.000+00:00'),
      endDate: moment.utc()
    }

    this._onStartDateChange = this._onStartDateChange.bind(this)
    this._onEndDateChange = this._onEndDateChange.bind(this)
  }

  componentDidMount() {
    const accounts = API.accounts.list()
    const splits = API.splits.list()
    Promise.all([accounts, splits]).then(([accounts, splits]) => {
      this.setState({accounts, splits})
    })
  }

  _onStartDateChange(date) {
    this.setState(prevState => {
      const {endDate} = prevState
      return endDate.isSameOrAfter(date) ? {startDate: date} : {}
    })
  }

  _onEndDateChange(date) {
    this.setState(prevState => {
      const {startDate} = prevState
      return startDate.isSameOrBefore(date) ? {endDate: date} : {}
    })
  }

  render () {
    const {startDate, endDate} = this.state
    return (
      <div>
        <Calendar date={startDate} onDateClick={this._onStartDateChange}/>
        <Calendar date={endDate} onDateClick={this._onEndDateChange}/>
        <TransactionSummary
          accounts={this.state.accounts}
          splits={this.state.splits}
          startDate={startDate}
          endDate={endDate}
          />
      </div>
    )
  }
}

window.api = API

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div'))
  )
})
