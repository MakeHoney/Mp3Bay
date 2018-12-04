import express from 'express'
import { controller } from './controller'
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

// GET /music/load?id=12
router.get('/load', controller.loadSong)
router.post('/save', upload.single('file'), controller.registerSong)
export default router
