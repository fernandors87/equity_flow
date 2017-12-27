import axios from 'axios'

export default class Transactions {
  list () {
    return axios('/api/v1/deals').then(response => {
      return response.data.map(tx => {
        tx.splits = tx.splits.map(s => {
          s.value = parseFloat(s.value)
          return s
        })

        return tx
      })
    })
  }
}