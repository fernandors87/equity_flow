import * as StatsUtils from 'support/stats_utils'
import { Set } from 'immutable'

describe('StatsUtils', () => {

  describe('sum', () => {

    it('sum up all numbers in a collection', () => {
      const collection = Set.of(1, 2, 3, 3)
      const actual = StatsUtils.sum(collection)
      expect(actual).toEqual(6)
    })

    it('return 0 when collection is empty', () => {
      const actual = StatsUtils.sum(Set())
      expect(actual).toEqual(0)
    })

    it('fails when there are non numeric values', () => {
      const actual = () => StatsUtils.sum(Set.of(1, 'a'))
      expect(actual).toThrow()
    })
  })

  describe('mean', () => {
    
    it('calculate the mean of all numbers in a collection', () => {
      const collection = Set.of(1, 2, 3, 3)
      const actual = StatsUtils.mean(collection)
      expect(actual).toEqual(2)
    })

    it('return 0 when collection is empty', () => {
      const actual = StatsUtils.mean(Set())
      expect(actual).toEqual(0)
    })

    it('fails when there are non numeric values', () => {
      const actual = () => StatsUtils.mean(Set.of(1, 'a'))
      expect(actual).toThrow()
    })
  })
})
