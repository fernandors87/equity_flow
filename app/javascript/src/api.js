import Accounts from './api/accounts'
import Transactions from './api/transactions'

export default class API {
  get accounts () {
    return new Accounts()
  }

  get transactions () {
    return new Transactions()
  }
}
