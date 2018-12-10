import Web3 from 'web3'
import { userIdentification } from '../../utils'
import config from '../../config'

export default {
  async getWeb3 () {
    let isUserConnected, result
    const web3 = new Web3(window.web3.currentProvider)
    const coinbase = (await web3.eth.getAccounts())[0]
    typeof coinbase === 'undefined'
      ? isUserConnected = false
      : isUserConnected = true

    if (isUserConnected) {
      result = { web3() { return web3 }, coinbase }

      let networkID = await result.web3().eth.net.getNetworkType()
        .catch(err => { throw new Error(`Unable to retrieve network ID, log: ${err}`) })
      result = Object.assign(result, { networkID })

      let balance = await result.web3().eth.getBalance(result.coinbase)
        .catch(err => { throw new Error(`Unable to retrieve balance for address: ${result.coinbase}, log: ${err} `) })
      result = Object.assign(result, { balance })
    } else {
      throw new Error('Unable to connect to Metamask')
    }
    return result
  },
  async pollWeb3 ({ state, rootState }) {
    let web3 = new Web3(window.web3.currentProvider)
    setInterval(async () => {
      if (typeof (await web3.eth.getAccounts())[0] === 'undefined') {
        clearWeb3Instance(state)
        clearUserInfo(rootState)
        // loop for account is changed
      } else if (state.web3.web3Instance && ((await web3.eth.getAccounts())[0] !== state.web3.coinbase)) {
        try {
          const newCoinbase = (await web3.eth.getAccounts())[0]
          const newBalance = await web3.eth.getBalance(newCoinbase)
          console.log(state.web3.web3Instance())
          const newBatBalance = await state.contractInstance()
            .methods.balanceOf().call({
            from: newCoinbase
          })
          changeCoinbase(state, {
            coinbase: newCoinbase,
            balance: newBalance,
            batBalance: newBatBalance
          })
          rootState.user.type = await userIdentification.userType()
          if(window.location.href !== `${config.HOST}/`) {
            window.location.replace('/')
          }
        } catch (err) {
          console.error('error occurred in pollWeb3', err)
          throw err
        }
      } else {
        try {
          let web3Copy = state.web3
          web3Copy.web3Instance = () => web3
          web3Copy.networkID = await web3.eth.net.getNetworkType()
          web3Copy.coinbase = (await web3.eth.getAccounts())[0]
          web3Copy.balance = await web3.eth.getBalance(state.web3.coinbase)
          web3Copy.batBalance = await state.contractInstance()
            .methods.balanceOf().call({
              from: web3Copy.coinbase
            })
          state.web3 = web3Copy
          rootState.user.type = await userIdentification.userType()
        } catch (err) {
          console.error(err)
        }
      }
    }, 2000)
  }
}

const changeCoinbase = (state, payload) => {
  state.web3.coinbase = payload.coinbase
  state.web3.balance = parseInt(payload.balance, 10)
  state.web3.batBalance = parseInt(payload.batBalance, 10)
}

const clearWeb3Instance = state => {
  state.web3.web3Instance = null
  state.web3.networkID = null
  state.web3.coinbase = null
  state.web3.balance = null
  state.web3.batBalance = null
}

const clearUserInfo = rootState => {
  rootState.user.name = null
  rootState.user.type = null
}
