import { Router } from 'express'
import * as destinationsCtrl from '../controllers/destinations.js'

const router = Router()

// GET - /destinations
router.get('/', destinationsCtrl.index)

export {
  router
}