import { ACCOUNTS_RECEIVED } from 'actions/accounts-actions'

export default function accountsReducer(state = {}, { type, payload }) {
  switch (type) {
    case ACCOUNTS_RECEIVED:
      return payload.accounts
    default:
      return state
  }
}
