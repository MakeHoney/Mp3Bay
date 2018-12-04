import Vue from 'vue'
import Vuex from 'vuex'
import { blockSync } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    blockSync
  },
  state: {
    user: {
      type: null,
      name: null,
      address: null,
      artistID: null,
      listenerID: null
    },
    artists: {
      addresses: null,
      names: null
    },
    listeners: {

    }
  },
  mutations: {
    setArtistAddresses(state, payload) {
      state.artists.addresses = payload
    },
    setArtistNames(state, payload) {
      state.artists.names = payload
    }
  },
  actions: {
    async getArtistAddresses({ commit, state }) {
      let result = await state.blockSync.contractInstance().methods.getAllArtistsAddrs().call()
      commit('setArtistAddresses', result)
    },
    async getArtistNames({ commit, state }) {
      let result = []
      for(let i = 0; i < state.artists.addresses.length; i++) {
        result.push(await state.blockSync.contractInstance().methods.getArtistNameByIndex(i).call())
      }
      commit('setArtistNames', result)
    }
  }
})
