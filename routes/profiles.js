import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profilesCtrl.index)
router.get('/:id', profilesCtrl.show)
router.post('/:id/bucket-list-destinations', isLoggedIn, profilesCtrl.createBucketListDestination)

export {
  router
}
