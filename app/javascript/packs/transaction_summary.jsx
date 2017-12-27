import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as _ from 'lodash'
import { Map } from 'immutable'

export default class TransactionSummary extends React.Component {

  constructor(props) {
    super(props)
  }

  months(startDate, endDate) {
    if (startDate > endDate) {
      throw `startDate(${startDate}) must not be greater than endDate(${endDate})`
    }

    const startOfMonth = moment(startDate).utc().startOf('month')
    const endOfMonth = moment(endDate).utc().endOf('month')

    const calc = (acc) => {
      const lastProcessed = _.first(acc)
      const plusOne = moment(lastProcessed).add(1, 'month')
      return plusOne.isBefore(endOfMonth) ? calc(_.concat(plusOne, acc)) : acc
    }
    const dates = calc([startOfMonth])
    return dates.map(m => m.toDate()).reverse()
  }

  categories(accounts, months) {
    const monthsMap = months.reduce((acc, month) => {
      const key = moment(month).utc().format('YYYY-MM-DD')
      return acc.set(key, 0)
    }, Map())

    return accounts.reduce((acc, account) => acc.set(account.id, monthsMap), Map())
  }

  cells(categories, transactions) {
    return transactions.reduce((acct, tx) => {
      const month = moment(tx.date).utc().startOf('month').format('YYYY-MM-DD')
      return tx.splits.reduce((accs, s) => {
        const value = s.position == "credit" ? -s.value : s.value
        const monthsMap = accs.get(s.account_id) || Map()
        const currentValue = monthsMap.get(month) || 0
        const updatedMonthsMap = monthsMap.set(month, currentValue + value)
        return accs.set(s.account_id, updatedMonthsMap)
      }, acct)
    }, categories)
  }

  render() {
    const months = this.months(this.props.startDate, this.props.endDate)
    const headers = months.map(d => {
      const month = moment(d).utc().format('YYYY-MM')
      return <th key={month}>{month}</th>
    })

    const categories = this.categories(this.props.accounts, months)
    const cells = this.cells(categories, this.props.transactions)
    const body = cells.map((row, account_id) => {
      const account = this.props.accounts.find(a => a.id == account_id) || {}
      const tableCells = row.map((value, month) => {
        const key = [account_id, month].join()
        return <td key={key}>{value}</td>
      }).toArray()

      return (
        <tr key={account_id}>
          <td>{account.name}</td>
          {tableCells}
        </tr>
      )
    }).toArray()

    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>Account</th>
              {headers}
            </tr>
          </thead>
          <tbody>
            {body}
          </tbody>
        </table>
      </div>
    )
  }
}

TransactionSummary.defaultProps = {
  accounts: [],
  transactions: []
};
