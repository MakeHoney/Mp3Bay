import { utils } from '../../utils'

export const controller = {
  // song id를 받아서 블록에서 조회(emitter) ipfshash를 통해서 ipfs load
  async loadSong (req, res) {
    const songID = [parseInt(req.query.id)]
    try {
      const filter = { songID }

      const events = await utils.event.getEventsFromBlock('SongCreated', filter)
      const songs = await utils.event.getDataFromEvents('SongCreated', events)
      const ipfsHash = songs[0].ipfsHash

      const { audio } = await utils.lib.ipfsService.loadObjFromFile(ipfsHash)
      const file = Buffer.from(audio.data)

      res.send(file)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async registerSong (req, res) {
    try {
      const file = req.file.buffer
      const title = req.body.title
      const userAccount = req.body.userAccount
      const ipfsHash = await utils.lib.ipfsService.saveObjAsFile({ audio: file })
      console.log(ipfsHash)

      // save into blockchain
      const contract = await utils.getContract
      await contract.methods.registerSong(title, ipfsHash).send({
        from: userAccount,
        gas: 1000000
      })

      res.json({
        message: 'successfully uploaded.',
        // ipfsHash
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}

