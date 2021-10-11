import { ScorchedMarketABI } from 'scorched'
import { ethers } from 'ethers'

const MARKET_ADDRESS = '0xCB6e1b9D7beD1a5E0cb05648Db5CbD4566788A0e'

export default {
  state: {
    suggesters: [],
  },
  mutations: {},
  actions: {
    loadSuggesters: async ({ state, rootState, dispatch }) => {
      const market = new ethers.Contract(MARKET_ADDRESS, ScorchedMarketABI, rootState.wallet.signer)
      const suggesterCount = +(await market.suggesterCount()).toString()
      const promises = []
      for (let x = 0; x < suggesterCount; x++) {
        promises.push(market.suggesterInfoByIndex(x))
      }
      // slice the 0 address
      state.suggesters = (await Promise.all(promises)).slice(1)
        .map(([address, url, name, bio]) => ({ address, url, name, bio }))
      for (const { address } of state.suggesters) {
        dispatch('loadIcon', address, { root: true })
      }
    },
    registerSuggester: async ({ state, rootState }, payload) => {
      {
        const { suggester, bio, name } = payload
        const market = new ethers.Contract(MARKET_ADDRESS, ScorchedMarketABI, rootState.wallet.signer)
        const count = await market.suggesterCount()
        const tx = await market.registerSuggester(
          '',
          name,
          bio
        )
        await tx.wait()
      }
      const [ address, url, name, bio ] = await market.suggesterInfoByIndex(count)
      state.suggesters = [...state.suggesters, { address, url, name, bio }]
    }
  }
}
