import React from 'react'
import PropTypes from 'prop-types'

import * as _ from 'lodash'
import moment from 'moment'
import { List, Set, Map, Record } from 'immutable'

export default class TransactionSummary extends React.Component {

  constructor(props) {
    super(props)
    this.state = defaultState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(defaultState(nextProps))
  }

  render() {
    const {accounts, months} = this.state
    const {splits} = this.props

    return (
      <div>
      <table className="table">
        { TableHead(months) }
        { TableBody(months, accounts, splits) }
      </table>
      </div>
    )
  }
}

TransactionSummary.defaultProps = {
  accounts: Set(),
  splits: Set(),
  startDate: moment.utc().subtract(11, 'months'),
  endDate: moment.utc()
}

TransactionSummary.propTypes = {
  accounts: PropTypes.instanceOf(Set),
  splits: PropTypes.instanceOf(Set),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment)
}

function defaultState(props) {
  const startDate = moment(props.startDate).utc()
  const endDate = moment(props.endDate).utc()

  return {
    accounts: accountsTree(props.accounts),
    startDate: startDate,
    endDate: endDate,
    months: months(startDate, endDate)
  }
}

export function months(startDate, endDate) {
  if (startDate.isAfter(endDate)) {
    throw `startDate(${startDate}) must not be greater than endDate(${endDate})`
  }

  const startOfMonth = moment(startDate).startOf('month')
  const endOfMonth = moment(endDate).endOf('month')

  const calc = (acc) => {
    const lastProcessed = acc.last()
    const plusOne = moment(lastProcessed).add(1, 'month')
    return plusOne.isBefore(endOfMonth) ? calc(acc.push(plusOne)) : acc
  }
  return calc(List.of(startOfMonth))
}

export function accountsTree(_accounts) {
  const accounts = Set(_accounts).sortBy(a => a.name)
  const lookup = Map(accounts.map(a => [a.id, a]))

  return accounts.reduce((res, account) => {
    const parent = lookup.get(account.parent_id)
    account.children = (account.children || Set())
    if (parent) {
      parent.children = (parent.children || Set()).add(account)
      return res
    }

    return res.set(account.id, account)
  }, Map()).toSet()
}

function TableHead(months) {
  const headers = months
    .map(d => d.format('YYYY-MM'))
    .map(m => <th key={m}>{m}</th>)

  return (
    <thead>
      <tr>
        <th>Account</th>
        {headers}
        <th>Mean</th>
      </tr>
    </thead>
  )
}

function TableBody(months, accounts, splits) {
  const rows = accounts.map(account => TableRows(months, account, splits))
  return (
    <tbody>
      {rows}
    </tbody>
  )
}

function TableRows(months, account, _splits) {
  const splits = _splits.filter(s => s.account_id == account.id)
  const cells = TableCells(account, months, splits)
  const children = account.children.map(c => TableRows(months, c, _splits))
  const style = {
    textIndent: `${account.level}em`
  }

  const mean = cells.reduce((a, b) => a + b.value, 0) / cells.size
  const root = (
    <tr key={account.id}>
      <td style={style}>{account.name}</td>
      {cells.map(c => c.html)}
      {TableCell({row: account.id, column: 'mean', value: mean}).html}
    </tr>
  )
  return List.of(root).push(children)
}

function TableCell(options) {
  const { row, column } = options
  const key = [options.row, options.column].join(',')
  const value = options.value || 0
  const html = <td key={key}>{value.toFixed(2)}</td>
  return {row, column, key, value, html}
}

function TableCells(account, months, splits) {
  return months.map(startOfMonth => {
    const month = startOfMonth.format('YYYY-MM')
    const sOfMonth = splits.filter(s => s.date.format('YYYY-MM') == month)
    const value = sOfMonth.toList().reduce((a, b) => a + b.value, 0)
    return TableCell({ row: account.id, column: month, value: value })
  })
}
