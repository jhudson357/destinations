import { Router } from 'express'
import * as destinationsCtrl from '../controllers/destinations.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - /destinations
router.get('/', destinationsCtrl.index)
// GET - /destinations/new
router.get('/new', isLoggedIn, destinationsCtrl.new)
// GET - /destinations/:id
router.get('/:id', destinationsCtrl.show)

// GET - /destinations/:id/new
// router.get('/:id/new', isLoggedIn, destinationsCtrl.newReviewForm)

// POST - /destinations
router.post('/', destinationsCtrl.create)
// POST - /destinations/:id
router.post('/:id/reviews', isLoggedIn, destinationsCtrl.createReview)

export {
  router
}