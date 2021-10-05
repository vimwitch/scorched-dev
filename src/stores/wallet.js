import { ethers } from 'ethers'
import { ScorchedABI } from 'scorched'

export default {
  state: {
    provider: {},
    signer: {},
    activeAddress: '',
    network: {},
  },
  mutations: {},
  actions: {
    load: async ({ state }) => {
      if (!window.ethereum) return
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      state.provider = new ethers.providers.Web3Provider(window.ethereum)
      state.signer = state.provider.getSigner()
      state.activeAddress = await state.signer.getAddress()
      state.network = await state.provider.getNetwork()
      console.log(state.network)
    },
    sign: async ({ state }, payload) => {
      if (!state.signer) throw new Error('Ethers signer is not initialized')
      const { domain, types, value } = payload
      const sig = await state.signer._signTypedData(domain, types, value)
      return sig
    }
  },
}