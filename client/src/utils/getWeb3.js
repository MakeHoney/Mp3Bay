import Web3 from 'web3'

let getWeb3 = new Promise(async (resolve, reject) => {
    let web3js = window.web3

    if(typeof web3js !== 'undefined') {
        let web3 = new Web3(web3js.currentProvider)
        resolve({
            // injectedWeb3: web3.isConnected,
            injectedWeb3: await web3.eth.net.isListening(),
            web3() {
                return web3
            }
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
        result.web3().eth.getCoinbase((err, coinbase) => {
            if(err) {
                reject(new Error('Unable to retrieve coinbase'))
            } else {
                result = Object.assign({}, result, { coinbase })
                resolve(result)
            }
        })
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.getBalance(result.coinbase, (err, balance) => {
            if(err) {
                reject(new Error(`Unable to retrieve balance for address: ${result.coinbase}`))
            } else {
                result = Object.assign({}, result, { balance })
                resolve(result)
            }
        })
    })
})

export default getWeb3