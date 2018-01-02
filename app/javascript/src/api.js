import { AccountRecord, SplitRecord } from './model'
import { OrderedSet, Set } from 'immutable'
import axios from 'axios'
import moment from 'moment'

export const accounts = {
  list() {
    return axios('/api/v1/accounts').then(response => {
      const records = response.data.map(x => new AccountRecord(x))
      return OrderedSet(records)
    })
  }
}

// FIXME: This call should be replaced by a lightweight alternative
export const splits = {
  list() {
    return axios('/api/v1/splits').then(response =>
      Set(response.data).map(s => {
        const parsedValue = parseFloat(s.value)
        const value = s.position == 'credit' ? -parsedValue : parsedValue
        const date = moment.utc(s.date)
        return new SplitRecord(s).merge({ value, date })
      })
    )
  }
}
