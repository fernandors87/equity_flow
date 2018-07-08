import { SPLITS_RECEIVED } from 'actions/splits-actions'

export default function splitsReducer(state = {}, { type, payload }) {
  switch (type) {
    case SPLITS_RECEIVED:
      return payload.splits
    default:
      return state
  }
}
