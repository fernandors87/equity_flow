import React from 'react'
import TransactionSummary from 'packs/transaction_summary'
import { months, sortedAccounts, accountsTree } from 'packs/transaction_summary'
import renderer from 'react-test-renderer'
import { Map, List, OrderedSet, Set } from 'immutable'
import moment from 'moment'

describe('TransactionSummary', () => {

  const accounts = Set([
    { id: 1, name: 'account 1', level: 0, parent_id: null },
    { id: 2, name: 'account 2', level: 1, parent_id: 1 }
  ])

  const splits = Set([
    {
      id: 1,
      account_id: 3,
      deal_id: 1,
      date: moment('2018-01-20').utc(),
      value: -9.99
    },
    {
      id: 2,
      account_id: 1,
      deal_id: 2,
      date: moment('2018-01-01').utc(),
      value: -9.99
    },
    {
      id: 3,
      account_id: 3,
      deal_id: 2,
      date: moment('2018-01-01').utc(),
      value: -9.99
    },
    {
      id: 4,
      account_id: 1,
      deal_id: 3,
      date: moment('2018-02-20').utc(),
      value: 9.99
    },
    {
      id: 5,
      account_id: 2,
      deal_id: 3,
      date: moment('2018-02-20').utc(),
      value: -2.5
    },
    {
      id: 7,
      account_id: 2,
      deal_id: 3,
      date: moment('2018-02-21').utc(),
      value: -2.5
    },
    {
      id: 7,
      account_id: 2,
      deal_id: 3,
      date: moment('2018-02-20').utc(),
      value: -4.99
    }
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

    it('generate an account tree sorted by name', () => {
      const accounts = Set([
        { id: 1, name: 'account 6', level: 0, parent_id: null },
        { id: 2, name: 'account 5', level: 0, parent_id: null },
        { id: 3, name: 'account 4', level: 1, parent_id: 1 },
        { id: 4, name: 'account 3', level: 1, parent_id: 1 },
        { id: 5, name: 'account 2', level: 1, parent_id: 2 },
        { id: 6, name: 'account 1', level: 2, parent_id: 3 },
      ])

      const expected = Set([
        {
          id: 2,
          name: 'account 5',
          level: 0,
          parent_id: null,
          children: Set([
            {
              id: 5,
              name: 'account 2',
              level: 1,
              parent_id: 2,
              children: Set()
            }
          ])
        },
        {
          id: 1,
          name: 'account 6',
          level: 0,
          parent_id: null,
          children: Set([
            {
              id: 4,
              name: 'account 3',
              level: 1,
              parent_id: 1,
              children: Set()
            },
            {
              id: 3,
              name: 'account 4',
              level: 1,
              parent_id: 1,
              children: Set([
                {
                  id: 6,
                  name: 'account 1',
                  level: 2,
                  parent_id: 3,
                  children: Set()
                }
              ])
            }
          ])
        }
      ])

      const actual = accountsTree(accounts)
      expect(actual).toEqual(expected)
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
