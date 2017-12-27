import React from 'react'
import ReactDOM from 'react-dom'
import TransactionSummary from './transaction_summary'
import API from './../src/api'
import bootstrap from '../src/application.scss'

class Application extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      transactions: []
    };

    this.state.accounts = [
      { id: 2, name: "acc 1"},
      { id: 6, name: "acc 2"}
    ]
  }

  componentDidMount() {
    const api = new API()

    api.transactions.list().then(tx => {
      this.setState({transactions: tx})
    })

    api.accounts.list().then(acc => {
      this.setState({accounts: acc})
    })
  }

  render () {
    return (
      <div>
        <TransactionSummary
          transactions={this.state.transactions}
          accounts={this.state.accounts}
          startDate={new Date("2017-10-25")}
          endDate={new Date("2018-02-25")}
          />
      </div>
    )
  }
}

window.api = new API()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})
