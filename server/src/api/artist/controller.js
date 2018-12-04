import { utils } from '../../utils'

export const controller = {
  async savePicture (req, res) {
    try {
      const file = req.file.buffer
      const ipfsHash = await utils.lib.ipfsService.saveObjAsFile({ picture: file })
      res.json({
        ipfsHash
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async loadPicture (req, res) {
    try {
      const filter = { artistID }
      // // 일단은 음원 한개만
      const songs = await utils.getEventsFromBlock('ArtistCreated', filter)
      const ipfsHash = songs[0].ipfsHash

      const { picture } = await utils.lib.ipfsService.loadObjFromFile('QmPx2caFcCtf4R5QDsVhgn7y8Hni7KuxVMQArTwG7BuVdE')
      console.log(picture)
      const file = Buffer.from(picture.data)

      res.writeHead(200, {'Content-Type': 'image/gif' })
      res.end(file, 'binary')
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
