import MonthlyExpenses from 'components/monthly_expenses'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAccounts } from 'actions/accounts-actions'
import { fetchSplits } from 'actions/splits-actions'

export class HomeView extends React.Component {

  componentDidMount() {
    const { start, end } = this.props.chrono
    this.props.fetchAccounts()
    this.props.fetchSplits(start, end)
  }

  render() {
    const { accounts, chrono, splits } = this.props
    const { start, end } = chrono
    return (
      <div className="home">
        <MonthlyExpenses startDate={ start } endDate={ end } accounts={ accounts } splits={ splits } type="expense" aggregation="month" />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    accounts: state.accounts,
    chrono: state.chrono,
    splits: state.splits,
  }
}

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({
    fetchAccounts,
    fetchSplits,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
