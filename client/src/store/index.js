import Vue from 'vue'
import Vuex from 'vuex'
import { blockSync } from './modules'
import { blockEvent } from '../utils'
import config from '../config'

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
      artistID: null
    },
    artist: {
      addresses: null,
      names: null
    },
    listeners: {

    },
    apiHost: config.API_HOST,
    artists: []
  },
  mutations: {
    setArtistAddresses(state, payload) {
      state.artist.addresses = payload
    },
    setArtistNames(state, payload) {
      state.artist.names = payload
    },
    setArtists(state, payload) {
      state.artists = payload
    }
  },
  actions: {
    async getArtistAddresses({ commit, state }) {
      let result = await state.blockSync.contractInstance().methods.getAllArtistsAddrs().call()
      commit('setArtistAddresses', result)
    },
    async getArtistNames({ commit, state }) {
      let result = []
      for(let i = 0; i < state.artist.addresses.length; i++) {
        result.push(await state.blockSync.contractInstance().methods.getArtistNameByIndex(i).call())
      }
      commit('setArtistNames', result)
    },
    async getArtists({ commit }) {
      const eventName = 'ArtistCreated'
      const events = await blockEvent.getEventsFromBlock(eventName)
      const artists = await blockEvent.getDataFromEvents(eventName, events)
      commit('setArtists', artists)
    }
  }
})
