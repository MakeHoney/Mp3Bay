import { Router } from 'express'
import { controller } from './controller'
import multer from 'multer'
const router = Router()
const upload = multer({ storage: multer.memoryStorage() })
const mid = upload.fields([
  {
    name: 'picture',
    maxCount: 1
  },
  {
    name: 'description',
    maxCount: 1
  }
])


router.get('/load-picture', controller.loadPicture)
router.get('/load-user-description', controller.loadDescription)
router.post('/upload-user-info', mid, controller.saveUserInfo)

export default router
