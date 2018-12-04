import { utils } from '../../utils'

export const controller = {
  // song id를 받아서 블록에서 조회(emitter) ipfshash를 통해서 ipfs load
  async loadSong (req, res) {
    const songID = [parseInt(req.query.id)]
    try {
      // input: id, output: ipfsHash
      const filter = { songID }
      // // 일단은 음원 한개만
      const songs = await utils.getEventsFromBlock('SongCreated', filter)
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
      // 유저 어카운트도 함께 넘어와야 등록가능
      // const userAccount = req.userAccount
      const file = req.file.buffer
      const ipfsHash = await utils.lib.ipfsService.saveObjAsFile({ audio: file })
      console.log(ipfsHash)

      // save into blockchain
      const contract = await utils.getContract
      await contract.methods.registerSong('title', ipfsHash).send({
        from: '0xd03ea8624C8C5987235048901fB614fDcA89b117',
        gas: 1000000
      })
      // await contract.methods.registerSong(title, ipfsHash).send({
      //   from: userAccount,
      //   gas: 1000000
      // })

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

