import { utils } from '../../utils'

export const controller = {
  async saveUserInfo (req, res) {
    try {
      const picture = req.files['picture'][0].buffer
      const description = req.body.description
      const ipfsHash = await utils.lib.ipfsService.saveObjAsFile({
        picture,
        description
      })
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
      const userInfo = await utils.event.getDataFromEvents('ArtistCreated', events)
      console.log(userInfo)
      const userInfoHash = userInfo[0].userInfoHash

      const { picture } = await utils.lib.ipfsService.loadObjFromFile(userInfoHash)
      const file = Buffer.from(picture)
      res.writeHead(200, {'Content-Type': 'image/gif' })
      res.end(file)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async loadDescription (req, res) {
    const artistID = [parseInt(req.query.id)]
    try {
      const filter = { artistID }
      const events = await utils.event.getEventsFromBlock('ArtistCreated', filter)
      const userInfo = await utils.event.getDataFromEvents('ArtistCreated', events)
      console.log(userInfo)
      const userInfoHash = userInfo[0].userInfoHash

      const { description } = await utils.lib.ipfsService.loadObjFromFile(userInfoHash)
      // const file = Buffer.from(description)
      res.json({
        description
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
