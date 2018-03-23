import { List, Record } from 'immutable'

export const AccountRecord = Record({
  id: null,
  name: null,
  description: null,
  type: null,
  parent_id: null,
  level: null,
  full_name: null,
  children: List()
}, 'AccountRecord')

export const SplitRecord = Record({
  id: null,
  account_id: null,
  deal_id: null,
  value: null,
  date: null
}, 'SplitRecord')
