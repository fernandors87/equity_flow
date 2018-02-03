import { AccountRecord, SplitRecord } from 'src/model'
import { accountsTree, months } from 'packs/transaction_summary'
import { List, OrderedSet, Set } from 'immutable'
import moment from 'moment'
import React from 'react'
import renderer from 'react-test-renderer'
import TransactionSummary from 'packs/transaction_summary'

describe('TransactionSummary', () => {

  const accounts = OrderedSet([
    AccountRecord({ id: 1, name: 'a6', full_name: 'a6', level: 1 }),
    AccountRecord({ id: 2, name: 'a5', full_name: 'a5', level: 1 }),
    AccountRecord({ id: 3, name: 'a4', full_name: 'a6:a4', level: 2, parent_id: 1 }),
    AccountRecord({ id: 4, name: 'a3', full_name: 'a6:a3', level: 2, parent_id: 1 }),
    AccountRecord({ id: 5, name: 'a2', full_name: 'a5:a2', level: 2, parent_id: 2 }),
    AccountRecord({ id: 6, name: 'a1', full_name: 'a6:a4:a1', level: 3, parent_id: 3 }),
  ])

  const splits = Set([
    SplitRecord({ id: 1, account_id: 3, deal_id: 1, date: moment.utc('2018-01-20'), value: -9.99 }),
    SplitRecord({ id: 2, account_id: 1, deal_id: 2, date: moment.utc('2018-01-01'), value: -9.99 }),
    SplitRecord({ id: 3, account_id: 3, deal_id: 2, date: moment.utc('2018-01-01'), value: -9.99 }),
    SplitRecord({ id: 4, account_id: 1, deal_id: 3, date: moment.utc('2018-02-20'), value: 9.99 }),
    SplitRecord({ id: 5, account_id: 2, deal_id: 3, date: moment.utc('2018-02-20'), value: -2.5 }),
    SplitRecord({ id: 7, account_id: 2, deal_id: 3, date: moment.utc('2018-02-21'), value: -2.5 }),
    SplitRecord({ id: 7, account_id: 2, deal_id: 3, date: moment.utc('2018-02-20'), value: -4.99 }),
  ])

  describe('months', () => {
    it('generate an array with months covering two dates', () => {
      const actual = months(moment.utc('2017-01-30'), moment.utc('2017-04-10')).map(d => d.unix())
      const expected = List(['2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01']).map(d => moment.utc(d).unix())
      expect(actual).toEqual(expected)
    })

    it('generate an empty array when endDate > startDate', () => {
      const actual = () => months(new Date('2018-01-30'), new Date('2017-04-10'))
      expect(actual).toThrow()
    })
  })

  describe('accountsTree', () => {

    it('generate an account tree sorted by full name', () => {

      const expected = OrderedSet([
        AccountRecord({ id: 2, name: 'a5', full_name: 'a5', level: 1, parent_id: null, children: OrderedSet([
          AccountRecord({ id: 5, name: 'a2', full_name: 'a5:a2', level: 2, parent_id: 2, children: OrderedSet() })
        ])}),
        AccountRecord({ id: 1, name: 'a6', full_name: 'a6', level: 1, parent_id: null, children: OrderedSet([
          AccountRecord({ id: 4, name: 'a3', full_name: 'a6:a3', level: 2, parent_id: 1, children: OrderedSet() }),
          AccountRecord({ id: 3, name: 'a4', full_name: 'a6:a4', level: 2, parent_id: 1, children: OrderedSet([
              AccountRecord({ id: 6, name: 'a1', full_name: 'a6:a4:a1', level: 3, parent_id: 3, children: OrderedSet() })
          ])})
        ])})
      ])

      const actual = accountsTree(accounts)
      expect(actual).toEqualImmutable(expected)
    })
  })

  it('should render a table with monthly account values', () => {
    const component = renderer.create(
      <TransactionSummary
        accounts={accounts}
        splits={splits}
        startDate={moment('2018-01-10').utc()}
        endDate={moment('2018-03-20').utc()} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render nicely with default props', () => {
    const component = renderer.create(<TransactionSummary />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
