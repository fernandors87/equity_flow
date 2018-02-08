import '../src/application.scss'
import * as API from './../src/api'
import DatePicker from '../components/datepicker'
import React from 'react'
import ReactDOM from 'react-dom'
import {Set} from 'immutable'
import TransactionSummary from './transaction_summary'
import moment from 'moment'

export default class Application extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: Set(),
      splits: Set(),
      startDate: moment.utc('2017-07-01T00:00:00.000+00:00'),
      endDate: moment.utc()
    }

    this._onDateChange = this._onDateChange.bind(this)
  }

 componentDidMount() {
   const {startDate, endDate} = this.state
   const {api} = this.props
   const accounts = api.accounts.list()
   const splits = api.splits.list(startDate, endDate)
   Promise.all([accounts, splits]).then(([accounts, splits]) => {
     this.setState({accounts, splits})
   })
 }

  _onDateChange(startDate, endDate) {
    const sameStart = startDate.isSame(this.state.startDate, 'day')
    const sameEnd = endDate.isSame(this.state.endDate, 'day')
    if (!sameStart || !sameEnd) {
      this.props.api.splits.list(startDate, endDate).then(splits => {
        this.setState({startDate, endDate, splits})
      })
    }
  }

  render () {
    const {startDate, endDate} = this.state
    return (
      <div>
        <DatePicker startDate={startDate} endDate={endDate} onDateChange={this._onDateChange} />
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
    <Application api={API} />,
    document.body.appendChild(document.createElement('div'))
  )
})
