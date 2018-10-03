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
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: null
  },
  mutations: {
    registerWeb3Instance (state, payload) {
        console.log('registerWeb3Instance Mutation being executed', payload);

        /* web3Copy 없이 리팩토링해보기 */
        let result = payload;
        let web3Copy = state.web3;
        web3Copy.coinbase = result.coinbase;
        web3Copy.networkId = result.networkId;
        web3Copy.balance = parseInt(result.balance, 10);
        web3Copy.isInjected = result.isInjected;
        web3Copy.web3Instance = result.web3;
        state.web3 = web3Copy;
    },
    registerContractInstance (state, payload) {
        console.log('Manager contract instance:', payload);

        state.contractInstance = () => payload;
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
    }
  }
})
