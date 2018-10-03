import Web3 from 'web3'
import { ABI, address } from './constants/managerContract'

let getContract = new Promise((resolve, reject) => {
    let web3 = new Web3(window.web3.currentProvider)
    let managerContractInstance = new web3.eth.Contract(ABI, address)
    resolve(managerContractInstance)
})

export default getContract