import React from 'react'
import * as _ from 'lodash'
import * as _date from 'date-fns'

export default class TransactionSummary extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      months: [],
      entires: [],
      accounts: [
        { id: 2, name: "asdasd"},
        { id: 6, name: "dfdfew"}
      ]
    }

    this.initializeMonths(new Date("2017-07-25"), new Date("2018-12-10"))
    this.initializeEntries()
  }

  initializeMonths() {
    const start = _date.startOfMonth(this.props.startDate)
    const end = _date.endOfMonth(this.props.endDate)
    const diff = _date.differenceInMonths(end, start) + 1

    let months = []
    for(let i = 0; i < diff; i++) {
      months.push(_date.addMonths(start, i))
    }

    this.state.months = months
  }

  initializeEntries() {
    const entries = this.props.transactions.map(tx => {
      return tx.splits.map(s => {
        const value = s.position == "credit" ? -s.value : s.value
        return { date: new Date(tx.date), account_id: s.account_id, value: value }
      })
    })

    this.state.entries = _.flatten(entries)
  }

  tbody() {
    return this.state.accounts.map(account => {
      const cells = this.state.months.map(startOfMonth => {
        const endOfMonth = _date.endOfMonth(startOfMonth)
        const entries = this.state.entries.filter(e => {
          return e.account_id == account.id && _date.isWithinRange(e.date, startOfMonth, endOfMonth)
        })
        const value = entries.reduce((acc, e) => acc + e.value, 0)
        const key = [account.id, startOfMonth].join(";")
        return <td key={key}>{value}</td>
      })

      return (
        <tr key={account.id}>
          <td>{account.name}</td>
          {cells}
        </tr>
      )
    })
  }

  thead() {
    const cells = this.state.months
      .map(d => _date.format(d, 'YYYY-MM'))
      .map(m => <th key={m}>{m}</th>)

    return (
      <tr>
        <th>Account</th>
        {cells}
      </tr>
    )
  }

  render() {
    return <div>
      <table>
        <thead>
          {this.thead()}
        </thead>
        <tbody>
          {this.tbody()}
        </tbody>
      </table>
    </div>
  }
}
