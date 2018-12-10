import { Router } from 'express'
import { controller } from './controller'
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const router = Router()
const mid = upload.fields([
  {
    name: 'audioFile',
    maxCount: 1
  },
  {
    name: 'description',
    maxCount: 1
  },
  {
    name: 'youtubeKey',
    maxCount: 1
  }
])

router.get('/load-song', controller.loadSong)
router.get('/load-song-meta', controller.loadSongMetaData)
router.post('/save', mid, controller.registerSong)
export default router
