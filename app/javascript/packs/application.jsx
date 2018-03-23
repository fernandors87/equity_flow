import '../src/application.scss'
import * as API from './../src/api'
import * as DateUtils  from 'support/date_utils'
import DatePicker from '../components/datepicker'
import { List } from 'immutable'
import MonthlyExpenses from 'components/monthly_expenses'
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

export default class Application extends React.Component {

  constructor(props) {
    super(props)
    const { startDate, endDate } = props
    this.state = {
      accounts: List(),
      splits: List(),
      startDate: DateUtils.utc(startDate) || moment.utc().subtract(1, 'year'),
      endDate: DateUtils.utc(endDate) || moment.utc()
    }

    this._onDateChange = this._onDateChange.bind(this)
  }

  componentDidMount() {
    const { startDate, endDate } = this.state
    const { api } = this.props
    const accounts = api.accounts.list()
    const splits = api.splits.list(startDate, endDate)
    Promise.all([accounts, splits]).then(([accounts, splits]) => {
      this.setState({ accounts, splits })
    })
  }

  _onDateChange(startDate, endDate) {
    const sameStart = startDate.isSame(this.state.startDate, 'day')
    const sameEnd = endDate.isSame(this.state.endDate, 'day')
    if (!sameStart || !sameEnd) {
      this.props.api.splits.list(startDate, endDate).then(splits => {
        const nsd = DateUtils.utc(startDate)
        const ned = DateUtils.utc(endDate)
        this.setState({ startDate: nsd, endDate: ned, splits })
      })
    }
  }

  render () {
    const { accounts, splits, startDate, endDate } = this.state
    return (
      <div>
        <DatePicker startDate={ startDate } endDate={ endDate } onDateChange={ this._onDateChange } />
        <MonthlyExpenses startDate={ startDate } endDate={ endDate } accounts={ accounts } splits={ splits } type="expense" aggregation="month" />
      </div>
    )
  }
}

window.api = API

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application api={ API } />,
    document.body.appendChild(document.createElement('div'))
  )
})
