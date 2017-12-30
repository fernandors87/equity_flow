import React from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'
import {Set} from 'immutable'

import * as API from './../src/api'
import '../src/application.scss'
import TransactionSummary from './transaction_summary'

class Application extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: Set(),
      splits: Set()
    }
  }

  componentDidMount() {
    const accounts = API.accounts.list()
    const splits = API.splits.list()
    Promise.all([accounts, splits]).then(([accounts, splits]) => {
      this.setState({accounts, splits})
    })
  }

  render () {
    return (
      <div>
        <TransactionSummary
          accounts={this.state.accounts}
          splits={this.state.splits}
          startDate={moment("2017-07-01").utc()}
          endDate={moment("2017-12-31").utc()}
          />
      </div>
    )
  }
}

window.api = API

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})
