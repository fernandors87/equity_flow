export function sum(series) {
  return series.reduce((sum, x) => {
    if (typeof x !== 'number') throw `'${x}' is not a number and cannot be summed`
    return sum + x
  }, 0)
}

export function mean(series) {
  if (series.isEmpty()) return 0
  return sum(series) / series.size
}
