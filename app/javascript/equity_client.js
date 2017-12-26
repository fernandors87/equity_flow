import axios from 'axios'

export default class EquityClient {

  constructor (basePath) {
    this.basePath = basePath
  }

  get deals () {
    return new Deals(this.basePath)
  }
}

class Deals {

  constructor (basePath) {
    this.basePath = basePath
  }

  list (callback) {
    return axios(`${this.basePath}/deals`).then(response => {
      return response.data
    })
  }
}
