import React from 'react'
import ReactDOM from 'react-dom'
import TransactionSummary from './transaction_summary'

class Application extends React.Component {

  constructor(props) {
    super(props)
    this.state = {};
    this.state.transactions = [
      {
        id: 1,
        date: "2018-01-10",
        description: null,
        created_at: "2017-12-22T17:13:49.533Z",
        updated_at: "2017-12-22T17:13:49.533Z",
        splits: [
          {
            id: 1,
            account_id: 2,
            position: "debit",
            value: 1000.0
          },
          {
            id: 2,
            account_id: 6,
            position: "credit",
            value: 1000.0
          }
        ]
      }
    ]
  }

  render () {
    return <div>
      <TransactionSummary
        transactions={this.state.transactions}
        startDate={new Date("2017-07-25")}
        endDate={new Date("2018-07-25")}
        />
    </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})
