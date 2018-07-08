import { List } from 'immutable'
import { SplitRecord } from 'src/model'
import axios from 'axios'
import moment from 'moment'

export const SPLITS_RECEIVED = 'splits:received'

function receiveSplits(splits) {
  return {
    type: SPLITS_RECEIVED,
    payload: {
      splits,
    },
    receivedAt: moment.utc()
  }
}

export function fetchSplits(start, end) {
  const parser = (s) => {
    const parsedValue = parseFloat(s.value)
    const value = s.position == 'credit' ? -parsedValue : parsedValue
    const date = moment.utc(s.date)
    return new SplitRecord(s).merge({ value, date })
  }

  return function(dispatch) {
    const start_date = start.format('YYYY-MM-DD')
    const end_date = end.format('YYYY-MM-DD')
    return axios('/api/v1/splits', { params: { start_date, end_date } })
      .then(response => List(response.data))
      .then(data => data.map(parser))
      .then(splits => dispatch(receiveSplits(splits)))
  }
}
