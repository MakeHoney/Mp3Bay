import truffleJSON from '../../../../../truffle/build/contracts/SongManager'

const networks = truffleJSON.networks
const keys = Object.keys(networks)
const lastIdxOfKeys = keys.length - 1

const ABI = truffleJSON.abi
// const address = networks['4649'].address
const address = networks[keys[lastIdxOfKeys]].address
// console.log(ABI)
console.log(address)

export { ABI, address }
