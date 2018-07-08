import { AccountRecord } from 'src/model'
import { List } from 'immutable'
import axios from 'axios'
import moment from 'moment'

export const ACCOUNTS_RECEIVED = 'accounts:received'

function receiveAccounts(accounts) {
  return {
    type: ACCOUNTS_RECEIVED,
    payload: {
      accounts,
    },
    receivedAt: moment.utc()
  }
}

export function fetchAccounts() {
  return function(dispatch) {
    return axios('/api/v1/accounts')
      .then(response => List(response.data))
      .then(data => data.map(x => new AccountRecord(x)))
      .then(accounts => dispatch(receiveAccounts(accounts)))
  }
}
