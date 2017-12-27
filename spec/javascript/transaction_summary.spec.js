import React from 'react'
import TransactionSummary from 'packs/transaction_summary'
import renderer from 'react-test-renderer'
import { Map } from 'immutable'

describe('TransactionSummary', () => {

  const transactions = [
    {
      id: 1,
      date: "2017-01-10",
      splits: [
        { id: 1, account_id: 1, position: "debit", value: 1000.0 },
        { id: 2, account_id: 2, position: "credit", value: 1000.0 }
      ]
    },
    {
      id: 2,
      date: "2017-02-15",
      splits: [
        { id: 3, account_id: 1, position: "debit", value: 999.99 },
        { id: 4, account_id: 2, position: "credit", value: 99.99 },
        { id: 5, account_id: 3, position: "credit", value: 900.0 }
      ]
    }
  ]

  const accounts = [
    { id: 1, name: "account 1" },
    { id: 2, name: "account 2" },
    { id: 3, name: "account 3" }
  ]

  const component = renderer.create(
    <TransactionSummary
      transactions={transactions}
      startDate={new Date("2017-07-10")}
      endDate={new Date("2017-12-10")} />)

  const instance = component.getInstance()

  describe('months', () => {

    it('generate an array with months covering two dates', () => {
      const actual = instance.months(new Date('2017-01-30'), new Date('2017-04-10'))
      const expected = ['2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01'].map(s => new Date(s))
      expect(actual).toEqual(expected)
    })

    it('generate an empty array when endDate > startDate', () => {
      const actual = () => instance.months(new Date('2018-01-30'), new Date('2017-04-10'))
      expect(actual).toThrow()
    })
  })

  describe('categories', () => {

    it('generate a map with account/month pairs', () => {
      const months = ['2017-01-01', '2017-02-01'].map(s => new Date(s))
      const actual = instance.categories(accounts, months)
      const expected = Map([
        [1, Map({'2017-01-01': 0, '2017-02-01': 0})],
        [2, Map({'2017-01-01': 0, '2017-02-01': 0})],
        [3, Map({'2017-01-01': 0, '2017-02-01': 0})]
      ])
      expect(actual).toEqual(expected)
    })
  })

  describe('cells', () => {

    it('add transaction values to given categories', () => {
      const months = ['2017-01-01', '2017-02-01', '2017-03-01'].map(s => new Date(s))
      const categories = instance.categories(accounts, months)
      const actual = instance.cells(categories, transactions)
      const expected = Map([
        [1, Map({'2017-01-01': 1000.0, '2017-02-01': 999.99, '2017-03-01': 0})],
        [2, Map({'2017-01-01': -1000.0, '2017-02-01': -99.99, '2017-03-01': 0})],
        [3, Map({'2017-01-01': 0, '2017-02-01': -900, '2017-03-01': 0})]
      ])
      expect(actual).toEqual(expected)
    })
  })

  describe('render', () => {

    it('table', () => {

      const component = renderer.create(
        <TransactionSummary
          transactions={transactions}
          accounts={accounts}
          startDate={new Date("2017-01-10")}
          endDate={new Date("2017-03-20")} />)

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })
  })
})
