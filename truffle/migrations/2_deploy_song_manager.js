const Ownable = artifacts.require('./Ownable.sol')
const SongLib = artifacts.require('./SongLib.sol')
const Manager = artifacts.require('./Manager.sol')
const SongManager = artifacts.require('./SongManager.sol')

module.exports = deployer => {
  // deployer.deploy(Ownable)
  // deployer.deploy(SongLib)
  // deployer.deploy(Manager)
  // deployer.link(SongLib, SongManager)
  // deployer.link(Manager, SongManager)
  deployer.deploy(SongManager)
}
