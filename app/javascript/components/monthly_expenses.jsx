import { List } from 'immutable'
import React from 'react'
import moment from 'moment'
import { range } from 'support/date_utils'
import { sum } from 'support/stats_utils'

export function Header({ months }) {
  const cells = months.map(m => <th key={ m.format() }>{ m.format('YYYY-MM') }</th>)
  return (
    <thead>
      <tr>
        <th>Account</th>
        { cells }
        <th>Sum</th>
        <th>Avg</th>
      </tr>
    </thead>
  )
}

export function Body({ accounts, months = List(), splits = List() }) {
  const rows = accounts.sortBy(a => a.name).map(a => {
    const splitsOfAccount = splits.filter(s => s.account_id === a.id)
    return <Row key={ a.id } label={ a.name } months={ months } splits={ splitsOfAccount } />
  })
  return (
    <tbody>
      { rows }
    </tbody>
  )
}

export function Footer({ months, splits }) {
  return (
    <tfoot>
      <Row label="Total" months={ months } splits={ splits } />
    </tfoot>
  )
}

export function Row({ label, months, splits }) {
  const splitsByMonth = splits.groupBy(s => moment(s.date).startOf('month'))
  const total = sum(splits.map(s => s.value)).toFixed(0)
  const avg = (total / months.size).toFixed(0)
  const cells = months.map(m => {
    const values = splitsByMonth.get(m, List()).map(s => s.value)
    const formatted = sum(values).toFixed(0)
    return <td className="value" key={ m.format() }>{ formatted }</td>
  })

  return (
    <tr>
      <td className="category">{ label }</td>
      { cells }
      <td className="summary total">{ total }</td>
      <td className="summary avg">{ avg }</td>
    </tr>
  )
}

export default class MonthlyExpenses extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { accounts, splits, startDate, endDate } = this.props
    const months = range(startDate, endDate, 'month')
    const expenseAccounts = accounts.filter(a => a.type === 'expense')
    const expenseIds = expenseAccounts.map(a => a.id)
    const splitsOfRange = splits.filter(s => s.date.isBetween(startDate, endDate, 'day', '[]'))
    const expenseSplits = splitsOfRange.filter(s => expenseIds.contains(s.account_id))
    return (
      <table className="monthly-expenses table table-hover">
        <Header months={ months } />
        <Body accounts={ expenseAccounts } months={ months } splits={ expenseSplits } />
        <Footer months={ months } splits={ expenseSplits } />
      </table>
    )
  }
}
