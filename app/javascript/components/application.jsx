import '../src/application.scss'
import DatePicker from '../components/datepicker'
import MonthlyExpenses from 'components/monthly_expenses'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAccounts } from 'actions/accounts-actions'
import { fetchSplits } from 'actions/splits-actions'
import { updateChrono } from 'actions/chrono-actions'

export class Application extends React.Component {

  constructor(props) {
    super(props)

    this._onDateChange = this._onDateChange.bind(this)
  }

  componentDidMount() {
    const { start, end } = this.props.chrono
    this.props.fetchAccounts()
    this.props.fetchSplits(start, end)
  }

  _onDateChange(startDate, endDate) {
    const chronoAction = this.props.updateChrono(startDate, endDate)
    const { start, end } = chronoAction.payload.chrono
    this.props.fetchSplits(start, end)
  }

  render () {
    const { accounts, chrono, splits } = this.props
    const { start, end } = chrono
    return (
      <div>
        <DatePicker startDate={ start } endDate={ end } onDateChange={ this._onDateChange } />
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
    updateChrono,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
