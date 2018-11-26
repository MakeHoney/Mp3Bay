import Web3 from 'web3'
import { config } from '../../config'
import { ABI, address } from './contracts/manager'

export const getContract = new Promise((resolve, reject) => {
    let web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/${config.INFURA_API_KEY}`))
    let contractInstance = new web3.eth.Contract(ABI, address)
    resolve(contractInstance)
})
