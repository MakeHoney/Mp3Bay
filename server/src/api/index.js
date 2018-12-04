import express from 'express'
import music from './music'
import artist from './artist'
const router = express.Router()

router.use('/music', music)
router.use('/artist', artist)

export default router
