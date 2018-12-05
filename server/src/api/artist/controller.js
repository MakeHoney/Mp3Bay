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
    const artistID = [parseInt(req.query.id)]
    try {
      const filter = { artistID }
      const events = await utils.event.getEventsFromBlock('ArtistCreated', filter)
      const pictures = await utils.event.getDataFromEvents('ArtistCreated', events)
      console.log(pictures)
      const pictureHash = pictures[0].pictureHash

      const { picture } = await utils.lib.ipfsService.loadObjFromFile(pictureHash)
      const file = Buffer.from(picture.data)

      res.writeHead(200, {'Content-Type': 'image/gif' })
      res.end(file)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
