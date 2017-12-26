import EquityClient from 'equity_client'

const api = new EquityClient('http://localhost:3001/api/v1')

describe('ApiClient', () => {
  describe('deals', () => {
    describe('list', () => {
      it('workd', async () => {
        expect.assertions(1)

        const actual = await api.deals.list()
        console.log(actual)
        expect(actual).toBeEqual(1)
      })
    })
  })
})
