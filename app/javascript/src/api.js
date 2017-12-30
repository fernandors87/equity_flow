import * as _ from 'lodash'
import axios from 'axios'
import { Set } from 'immutable'
import moment from 'moment'

export const accounts = {
  list() {
    return axios('/api/v1/accounts').then(response => Set(response.data))
  }
}

export const splits = {
  list() {
    return axios('/api/v1/splits').then(response =>
      Set(response.data).map(s => {
        const value = s.position === 'credit' ? -parseFloat(s.value) : parseFloat(s.value)
        const date = moment(s.date).utc()
        return _.merge(s, {value, date})
      })
    )
  }
}
