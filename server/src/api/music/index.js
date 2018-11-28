import express from 'express'
import multer from 'multer'
import { controller } from './controller'
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

// GET /music/load?id=12
router.get('/load', controller.load)
router.post('/test', upload.single('file'), controller.register)
export default router
