import { web3, getContract } from "../../utils"

const state = {
    web3: {
        web3Instance: null,
        networkID: null,
        coinbase: null,
        balance: null,
        batBalance: null
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

        web3.pollWeb3({ state, rootState })
    },
    setContractInstance (state, payload) {
        const { contractInstance, batBalance } = payload
        state.contractInstance = () => contractInstance
        state.web3.batBalance = batBalance
    }
}

const actions = {
    async checkWeb3({ commit, rootState, state }) {
        try {
            let result = await web3.getWeb3()
            commit('setWeb3Meta', {
                result,
                rootState
            })
        } catch (err) {
            web3.pollWeb3({ state, rootState })
        }
    },
    async getContractInstance({ commit, state }) {
        try {
            const contractInstance = await getContract
            const batBalance = await contractInstance.methods.balanceOf().call({
                from: state.web3.coinbase
            })
            commit('setContractInstance', {
                contractInstance,
                batBalance
            })
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
