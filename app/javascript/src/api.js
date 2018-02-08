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

export const splits = {
  list(startDate, endDate) {
    const sd = startDate.format('YYYY-MM-DD')
    const ed = endDate.format('YYYY-MM-DD')
    return axios(`/api/v1/splits?start_date=${sd}&end_date=${ed}`).then(response =>
      Set(response.data).map(s => {
        const parsedValue = parseFloat(s.value)
        const value = s.position == 'credit' ? -parsedValue : parsedValue
        const date = moment.utc(s.date)
        return new SplitRecord(s).merge({ value, date })
      })
    )
  }
}
