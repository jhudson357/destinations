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
// GET - /destinations/:destinationId/reviews/:reviewId
router.get('/:destinationId/reviews/:reviewId', destinationsCtrl.readReview)
// GET - /destinations/:destinationId/reviews/:reviewId/edit
router.get('/:destinationId/reviews/:reviewId/edit', isLoggedIn, destinationsCtrl.editReview)

// POST - /destinations
router.post('/', destinationsCtrl.create)
// POST - /destinations/:id
router.post('/:id/reviews', isLoggedIn, destinationsCtrl.createReview)

// DELETE - /destinations/destinationId/reviews/:reviewId
router.delete('/:destinationId/reviews/:reviewId', isLoggedIn, destinationsCtrl.deleteReview)

// PUT - /destinations/:destinationsId/reviews/:reviewId
router.put('/:destinationId/reviews/:reviewId', isLoggedIn, destinationsCtrl.updateReview)

export {
  router
}