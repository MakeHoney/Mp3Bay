import { getWeb3, pollWeb3 } from "../../utils/getWeb3"
import { getContract } from "../../utils/getContract"

const state = {
    web3: {
        web3Instance: null,
        networkID: null,
        coinbase: null,
        balance: null
    },
    contractInstance: null
}

const getters = {
    contractMethods: state => state.contractInstance().methods
}

const mutations = {
    setWeb3Meta (state, payload) {
        const { result, rootState } = payload
        let web3Copy = state.web3
        web3Copy.web3Instance = result.web3
        web3Copy.networkID = result.networkID
        web3Copy.coinbase = result.coinbase
        web3Copy.balance = parseInt(result.balance, 10)
        state.web3 = web3Copy

        pollWeb3({ state, rootState })
    },
    setContractInstance (state, payload) {
        state.contractInstance = () => payload
    }
}

const actions = {
    async checkWeb3({ commit, rootState, state }) {
        try {
            let result = await getWeb3()
            commit('setWeb3Meta', {
                result,
                rootState
            })
        } catch (err) {
            console.log(err)
            pollWeb3({ state, rootState })
        }
    },
    async getContractInstance({ commit }) {
        try {
            let result = await getContract
            commit('setContractInstance', result)
        } catch (err) {
            throw console.error('Error in action getContractInstance', err)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
