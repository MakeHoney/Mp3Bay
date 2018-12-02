import truffleJSON from '../../../../../truffle/build/contracts/SongManager'

const networks = truffleJSON.networks
const keys = Object.keys(networks)
const lastIdxOfKeys = keys.length - 1

const ABI = truffleJSON.abi
// const address = networks['4649'].address
// const address = networks[keys[lastIdxOfKeys]].address
const address = '0x59746f07246ad096b345231a59a9943b71fa4a4a'
// console.log(ABI)
console.log(address)

export { ABI, address }
