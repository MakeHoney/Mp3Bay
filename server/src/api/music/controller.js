import { utils } from '../../utils'

export const controller = {
  // song id를 받아서 블록에서 조회(emitter) ipfshash를 통해서 ipfs load
  async load (req, res) {
    try {
      const tmpHash = 'QmWx16SWKaTFp4WDNYvRxru8wmJp8LWF4Pg6PAtbHBSk32'
      const contract = await utils.getContract
      const events = await contract.getPastEvents('SongCreated', {
        fromBlock: 0,
        toBlock: 'latest'
      })

      console.log(events)

      const audio = await utils.lib.ipfsService.loadAudioBinary(tmpHash)
      console.log(audio)
      res.send(audio)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async register (req, res) {
    try {
      const file = req.file.buffer
      const ipfsHash = await utils.lib.ipfsService.saveFile(file)
      console.log(ipfsHash)
      res.json({
        message: 'successfully uploaded.',
        ipfsHash
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}

