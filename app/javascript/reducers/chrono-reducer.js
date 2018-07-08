import { UPDATE_CHRONO } from 'actions/chrono-actions'

export default function chronoReducer(state = {}, { type, payload }) {
  switch (type) {
    case UPDATE_CHRONO:
      return payload.chrono
    default:
      return state
  }
}
