import express from 'express'
import music from './music'
import upload from './upload'
const router = express.Router()

router.use('/music', music)
router.use('/upload', upload)

export default router
