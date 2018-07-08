import moment from 'moment'

export default class Chrono {

  constructor(start, end, resolution = moment.duration(1, 'month')) {
    this._start = moment.utc(start)
    this._end = moment.utc(end)
    this._resolution = resolution
    if (this._start.isAfter(this._end)) {
      const isos = this._start.toISOString()
      const isoe = this._end.toISOString()
      throw `start date[${isos}] should not be greater than end date[${isoe}].`
    }
  }

  get start() {
    return this._start
  }

  get end() {
    return this._end
  }
}
