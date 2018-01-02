import { OrderedSet, Record } from 'immutable'

export const AccountRecord = Record({
  id: null,
  name: null,
  description: null,
  type: null,
  parent_id: null,
  level: null,
  full_name: null,
  children: OrderedSet()
}, 'AccountRecord')

export const SplitRecord = Record({
  id: null,
  account_id: null,
  deal_id: null,
  value: null,
  date: null
}, 'SplitRecord')
