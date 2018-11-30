const SongManager = artifacts.require('./SongManager.sol')

module.exports = deployer => {
  deployer.deploy(SongManager)
}
