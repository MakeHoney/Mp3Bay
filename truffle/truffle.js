// When this file changed, you need to delete build directory
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 4712388
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
