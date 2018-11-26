import express from 'express'
import { controller } from './controller'
const router = express.Router()

// GET /music/load?id=12
router.get('/load', controller.loadMusic)

export default router
