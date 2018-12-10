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
    apiHost: config.API_HOST,
    artists: [],
    playList: []
  },
  mutations: {
    setArtistAddresses(state, payload) {
      state.artist.addresses = payload
    },
    setArtistNames(state, payload) {
      state.artist.names = payload
    },
    setArtists(state, payload) {
      console.log(payload)
      state.artists = payload
    },
    setPlayList(state, payload) {
      state.playList = payload
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
      // state.artists.length = 0
      // artists.reverse()
      commit('setArtists', artists)
    },
    async initPlayList ({ commit, state }) {
      const songIDList = await state.blockSync.contractInstance().methods
        .getSongIDsByListenerAcc().call({
        from: state.blockSync.web3.coinbase
      })
      const list = []
      songIDList.forEach(async songID => {
        const song = await state.blockSync.contractInstance().methods
          .getSongBySongID(songID).call()
        list.push({
          title: song.title,
          artist: song.artistName,
          src: `${config.API_HOST}/music/load-song?id=${songID}`,
          pic: `${config.API_HOST}/artist/load-picture?id=${song.artistID}`
        })
      })
      commit('setPlayList', list)
    }
  }
})
