import { Router } from 'express'
import { controller } from './controller'
const router = Router()

router.post('/upload-pic', controller.savePicture)

export default router
