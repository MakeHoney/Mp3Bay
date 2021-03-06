import Web3 from 'web3'
import { ABI, address } from './contracts/manager'

export default new Promise((resolve, reject) => {
    let web3 = new Web3(window.web3.currentProvider)
    let contractInstance = new web3.eth.Contract(ABI, address)
    resolve(contractInstance)
})
