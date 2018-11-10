import Web3 from 'web3'
import store from '../../store'

export const getWeb3 = new Promise((resolve, reject) => {
    let isUserConnected;
    const web3 = new Web3(window.web3.currentProvider)
    const coinbase = web3.eth.getAccounts()[0]
    typeof coinbase === 'undefined'
        ? isUserConnected = false
        : isUserConnected = true

    if (isUserConnected) {
        resolve({
            web3() {
                return web3
            },
            coinbase
        })
    } else {
        reject(new Error('Unable to connect to Metamask'))
    }
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.net.getNetworkType((err, networkID) => {
            if(err) {
                reject(new Error('Unable to retrieve network ID'))
            } else {
                result = Object.assign({}, result, { networkID })
                resolve(result)
            }
        })
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.getBalance(result.coinbase, (err, balance) => {
            if (err) {
                reject(new Error(`Unable to retrieve balance for address: ${result.coinbase}`))
            } else {
                result = Object.assign({}, result, { balance })
                resolve(result)
            }
        })
    })
})

export const pollWeb3 = state => {
    let web3 = new Web3(window.web3.currentProvider)

    setInterval(async () => {
        if (typeof (await web3.eth.getAccounts())[0] === 'undefined') {
            store.commit('resetWeb3Instance')
        } else if (state.web3.web3Instance) {
            if ((await web3.eth.getAccounts())[0] !== store.state.web3.coinbase) {
                let newCoinbase = (await web3.eth.getAccounts())[0]
                web3.eth.getBalance(newCoinbase, (err, newBalance) => {
                    if (err) {
                        // 수정 필요
                        console.log(err)
                    } else {
                        store.commit('changeCoinbase', {
                            coinbase: newCoinbase,
                            balance: parseInt(newBalance, 10)
                        })
                    }
                })
            }
        } else {
            let web3Copy = state.web3
            web3Copy.web3Instance = () => web3
            web3Copy.networkID = await web3.eth.net.getNetworkType()
            web3Copy.coinbase = (await web3.eth.getAccounts())[0]
            web3Copy.balance =  await web3.eth.getBalance(state.web3.coinbase)
            state.web3 = web3Copy
        }
    }, 2000)
}
