import Chrono from 'models/chrono'

export const UPDATE_CHRONO = 'chrono:updateChrono'

export function updateChrono(startDate, endDate) {
  return {
    type: UPDATE_CHRONO,
    payload: { chrono: new Chrono(startDate, endDate) }
  }
}
