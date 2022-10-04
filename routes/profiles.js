import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profilesCtrl.index)
router.get('/:id', profilesCtrl.show)
router.post('/:id/destinations', isLoggedIn, profilesCtrl.addDestination)
router.post('/:id/bucket-list-destinations', isLoggedIn, profilesCtrl.createBucketListDestination)
router.delete('/bucket-list-destinations/:id', isLoggedIn, profilesCtrl.deleteBucketListDestination)

export {
  router
}
