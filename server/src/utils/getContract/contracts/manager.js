import truffleJSON from '../../../../../truffle/build/contracts/SongManager'

const networks = truffleJSON.networks
// const keys = Object.keys(networks)
// const lastIdxOfKeys = keys.length - 1

const ABI = truffleJSON.abi
const address = networks['4649'].address
// const address = networks[keys[lastIdxOfKeys]].address
// const address = '0x1a782cc3fb11a481bf6e0f35437af3a049c6ac62'
// console.log(ABI)
console.log(address)

export { ABI, address }
