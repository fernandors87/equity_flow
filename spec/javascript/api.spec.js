import moment from 'moment'
import { Set } from 'immutable'

describe('api', () => {

  beforeEach(() => jest.resetModules())

  describe('accounts', () => {

    describe('list', () => {

      it('should convert the response data to a Set', () => {
        const data = [{ id: 1 }]
        jest.doMock('axios', () => jest.fn(() => Promise.resolve({ data })))

        expect.assertions(2)
        const expected = Set([{id: 1}])
        return require('src/api').accounts.list().then(a => {
          expect(Set.isSet(a)).toBeTruthy()
          expect(JSON.stringify(a)).toEqual(JSON.stringify(expected))
        })
      })
    })
  })

  describe('splits', () => {

    describe('list', () => {

      it('should convert the response data to a Set', () => {
        const data = [{ position: 'credit', value: '100', date: '2017-01-01'}]
        jest.doMock('axios', () => jest.fn(() => Promise.resolve({ data })))

        expect.assertions(2)
        const expected = Set([{ 'position': 'credit', value: -100, date: moment('2017-01-01').utc() }])
        return require('src/api').splits.list().then(s => {
          expect(Set.isSet(s)).toBeTruthy()
          expect(JSON.stringify(s)).toEqual(JSON.stringify(expected))
        })
      })
    })
  })
})
