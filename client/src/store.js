import Vue from 'vue'
import Vuex from 'vuex'
import getWeb3 from './utils/getWeb3';
import getContract from './utils/getContract';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkID: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: null,
    artists: {
        addresses: null,
        names: null
    }
  },
  mutations: {
    registerWeb3Instance (state, payload) {
        console.log('registerWeb3Instance Mutation being executed', payload);

        /* web3Copy 없이 리팩토링해보기 */
        let result = payload;
        let web3Copy = state.web3;
        web3Copy.coinbase = result.coinbase;
        web3Copy.networkID = result.networkID;
        web3Copy.balance = parseInt(result.balance, 10);
        web3Copy.isInjected = result.isInjected;
        web3Copy.web3Instance = result.web3;
        state.web3 = web3Copy;
    },
    registerContractInstance (state, payload) {
        state.contractInstance = () => payload;
    },
    setArtistAddresses(state, payload) {
        state.artists.addresses = payload
    },
    setArtistNames(state, payload) {
        state.artists.names = payload
    }
  },
  actions: {
    async registerWeb3({ commit }) {
        console.log('registerWeb3 Action being executed');

        let result = await getWeb3
        .catch(err => { console.error('error in action registerWeb3', err) });
        commit('registerWeb3Instance', result);
    },
    async getContractInstance({ commit }) {
        let result = await getContract
        .catch(err => { console.error('error in action getContractInstance', err) });
        commit('registerContractInstance', result);
    },
    async getArtistAddresses({ commit, state }) {
        let result = await state.contractInstance().methods.getAllArtistAddrs().call()
        commit('setArtistAddresses', result)
    },
    async getArtistNames({ commit, state }) {
        let result = []
        for(let i = 0; i < state.artists.addresses.length; i++) {
            result.push(await state.contractInstance().methods.getArtistNameByIndex(i).call())
        }
        commit('setArtistNames', result)
    }
  }
})
