import { Router } from 'express'
import { controller } from './controller'
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const router = Router()

router.get('/load-picture', controller.loadPicture)
router.post('/upload-picture', upload.single('picture'), controller.savePicture)

export default router
