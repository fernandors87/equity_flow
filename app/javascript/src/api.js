import Transactions from './api/transactions'

export default class API {

  get transactions () {
    return new Transactions()
  }
}
