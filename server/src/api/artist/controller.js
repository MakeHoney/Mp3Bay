import { utils } from '../../utils'

export const controller = {
  async savePicture (req, res) {
    try {
      const file = req.picture.buffer
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
      // artistID 인자로 받기
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
