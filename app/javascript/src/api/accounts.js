import axios from 'axios'

export default class Accounts {
  list () {
    return axios('/api/v1/accounts').then(response => {
      return response.data
    })
  }
}
