import { List, Record } from 'immutable'

export default Record({
  id: null,
  name: null,
  description: null,
  type: null,
  parent_id: null,
  level: null,
  full_name: null,
  children: List()
}, 'Account')
