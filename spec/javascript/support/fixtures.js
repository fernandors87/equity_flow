import {SplitRecord} from 'src/model'
import moment from 'moment'

export const splitFix = SplitRecord({
  id: 1,
  account_id: 2,
  deal_id: 3,
  value: -123.45,
  date: moment.utc([2018, 0, 1])
})
