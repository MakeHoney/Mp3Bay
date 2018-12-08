import Web3 from 'web3'
import { config } from '../../config'
import { ABI, address } from './contracts/manager'

export const getContract = new Promise(resolve => {
    let web3 = new Web3(new Web3.providers.HttpProvider(config.LOCAL_PROVIDER))
    let contractInstance = new web3.eth.Contract(ABI, address)
    resolve(contractInstance)
})
