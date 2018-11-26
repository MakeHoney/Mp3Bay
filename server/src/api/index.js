import express from 'express'
import music from './music'
const router = express.Router()

router.use('/music', music)

export default router
