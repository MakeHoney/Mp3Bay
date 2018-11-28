import { utils } from '../../utils'

export const controller = {
  // song id를 받아서 블록에서 조회(emitter) ipfshash를 통해서 ipfs load
  async loadSong (req, res) {
    const songID = [req.query.id]
    try {
      // input: id, output: ipfsHash
      const filter = { songID }
      const songs = await utils.getEventsFromBlock('SongCreated', filter)
      // 일단은 음원 한개만
      const ipfsHash = songs[0].ipfsHash
      const audio = await utils.lib.ipfsService.loadAudioBinary(ipfsHash)
      console.log(audio)
      res.send(audio)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async registerSong (req, res) {
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

