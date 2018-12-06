import { Router } from 'express'
import { controller } from './controller'
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const mid = upload.single('audioFile')
const router = Router()

// GET /music/load?id=12
router.get('/load', controller.loadSong)
router.post('/save', mid, controller.registerSong)
export default router
