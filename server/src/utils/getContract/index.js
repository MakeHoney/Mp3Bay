import Web3 from 'web3'
import { ABI, address } from './contracts/manager'

export const getContract = new Promise((resolve, reject) => {
    let web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:8822`))
    let contractInstance = new web3.eth.Contract(ABI, address)
    resolve(contractInstance)
})
