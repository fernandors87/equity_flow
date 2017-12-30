import React from 'react'
import PropTypes from 'prop-types'

import * as _ from 'lodash'
import moment from 'moment'
import { List, Set, Map } from 'immutable'

export default class TransactionSummary extends React.Component {

  constructor(props) {
    super(props)
    this.state = defaultState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(defaultState(nextProps))
  }

  render() {
    const headers = this.state.months
      .map(d => d.format('YYYY-MM'))
      .map(m => <th key={m}>{m}</th>)

    const {accounts, months} = this.state
    const {splits} = this.props

    const body = tableBody(accounts, months, splits)

    return (
      <div>
      <table className="table">
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

function tableCells(account, months, splits) {
  const values = months.map(startOfMonth => {
    const month = startOfMonth.format('YYYY-MM')
    const sOfMonth = splits.filter(s => s.date.format('YYYY-MM') == month)
    const value = sOfMonth.toList().map(s => s.value).reduce((a, b) => a + b, 0)
    const key = [account.id, month].join(',')
    return { key: key, value: value }
  })

  return values.map(e => {
    return <td key={e.key}>{e.value.toFixed(2)}</td>
  })
}

function tableRows(account, months, _splits) {
  const splits = _splits.filter(s => s.account_id == account.id)
  const cells = tableCells(account, months, splits)
  const children = account.children.map(c => tableRows(c, months, _splits))
  const style = {
    textIndent: `${account.level}em`
  }
  console.log(style)
  const root = (
    <tr key={account.id}>
      <td style={style}>{account.name}</td>
      {cells}
    </tr>
  )
  return [root, children]
}

function tableBody(accounts, months, splits) {
  return accounts.map(account => tableRows(account, months, splits))
}
