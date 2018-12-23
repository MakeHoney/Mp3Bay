import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { blockSync } from './modules'
import { blockEvent, getPlayList } from '../utils'
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
      artistID: null,
      description: null,
      pictureHost: null
    },
    artist: {
      addresses: null,
      names: null
    },
    apiHost: config.API_HOST,
    // For artists page
    artists: [],
    // For flee market page
    posts: [],

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
      state.artists = payload
    },
    setPlayList(state, payload) {
      state.playList = payload
    },
    setArtistMeta (state, payload) {
      state.user.pictureHost = `${state.apiHost}/artist/load-picture?id=${state.user.artistID}`
      state.user.description = payload
    },
    setPosts (state, payload) {
      state.posts = payload
    }
  },
  actions: {
    async getArtistAddresses({ commit, state }) {
      let result = await state.blockSync.contractInstance()
        .methods.getAllArtistsAddrs().call()
      commit('setArtistAddresses', result)
    },
    async getArtistNames({ commit, state }) {
      let result = []
      for(let i = 0; i < state.artist.addresses.length; i++) {
        result.push(await state.blockSync.contractInstance()
          .methods.getArtistNameByIndex(i).call())
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
    async getPosts ({ commit }) {
      const eventName = 'ListenerCreated'
      const events = await blockEvent.getEventsFromBlock(eventName)
      const listeners = await blockEvent.getDataFromEvents(eventName, events)
      const contractMethods = this.getters['blockSync/contractMethods']

      const posts = []
      listeners.forEach(async listener => {
        const listenerSongIDs = await contractMethods
          .getSongIDsByListenerAcc(listener.listenerAccount, 'posted').call()
        
        listenerSongIDs.forEach(async songID => {
          const song = await contractMethods.getSongBySongID(songID).call()
          posts.push({
            sellerName: listener.name,
            sellerAcc: listener.listenerAccount,
            songTitle: song.title,
            artistName: song.artistName,
            songID
          })
        })
      })
      commit('setPosts', posts)
    },
    async initPlayList ({ commit, state }) {
      const playList = await getPlayList(state)
      commit('setPlayList', playList)
    },
    async initArtistMeta ({ commit, state }) {
      const url = `${state.apiHost}/artist/load-user-description?id=${state.user.artistID}`
      const { data } = await axios.get(url)
      commit('setArtistMeta', data.description)
    }
  }
})
