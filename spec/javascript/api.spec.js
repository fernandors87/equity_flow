import { AccountRecord, SplitRecord } from 'src/model'
import { OrderedSet, Set } from 'immutable'
import * as CustomMatchers from './custom_matchers'
import moment from 'moment'

expect.extend(CustomMatchers)

function mockResponse(mockFn) {
  jest.doMock('axios', () => jest.fn(mockFn))
}

function api() {
  return require('src/api')
}

describe('api', () => {

  beforeEach(() => jest.resetModules())

  describe('accounts', () => {

    describe('list', () => {

      const data = [{
        id: 1,
        name: "Bank",
        description: "desc",
        "type": "asset",
        parent_id: 2,
        level: 2,
        full_name: "Assets:Bank"
      }]

      it('should transform the response to an OrderedSet<AccountRecord>', () => {
        mockResponse(() => Promise.resolve({
          data
        }))
        expect.assertions(1)
        const expectedRecord = AccountRecord({
          id: 1,
          name: "Bank",
          description: "desc",
          "type": "asset",
          parent_id: 2,
          level: 2,
          full_name: "Assets:Bank",
          children: OrderedSet()
        })

        const expectedCollection = OrderedSet.of(expectedRecord)

        return api().accounts.list().then(x => {
          expect(x).toEqualImmutable(expectedCollection)
        })
      })
    })
  })

  describe('splits', () => {

    describe('list', () => {

      const data = [{
        id: 1,
        account_id: 2,
        deal_id: 3,
        position: "credit",
        value: "123.45",
        date: "2018-01-01"
      }]

      it('should transform the response to a Set<SplitRecord>', () => {
        mockResponse(() => Promise.resolve({
          data
        }))
        expect.assertions(1)
        const expectedRecord = SplitRecord({
          id: 1,
          account_id: 2,
          deal_id: 3,
          value: -123.45,
          date: moment.utc([2018, 0, 1])
        })

        const expectedCollection = Set.of(expectedRecord)

        return api().splits.list().then(x => {
          expect(x).toEqualImmutable(expectedCollection)
        })
      })
    })
  })
})
