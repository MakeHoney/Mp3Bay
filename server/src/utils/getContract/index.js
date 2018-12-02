import Web3 from 'web3'
import { ABI, address } from './contracts/manager'

export const getContract = new Promise((resolve, reject) => {
    let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/ef6f0c88c7214044b408e87817b0f1ae'))
    let contractInstance = new web3.eth.Contract(ABI, address)
    resolve(contractInstance)
})
