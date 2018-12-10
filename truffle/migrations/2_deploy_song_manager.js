const SongManager = artifacts.require('./SongManager.sol')
const BayToken = artifacts.require('./BayToken.sol')
module.exports = deployer => {
  deployer.deploy(BayToken)
    .then(() => {
      return deployer.deploy(SongManager, BayToken.address)
    })
}
