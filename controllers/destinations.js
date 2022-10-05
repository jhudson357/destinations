import { Destination } from "../models/destination.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Destination.find({})
  .then(destinations => {
    res.render('destinations/index', {
      destinations,
      title: 'Destination Reviews'
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/')
  })
}

function newDestination(req, res) {
  Destination.find({})
  .then(destinations => {
    res.render('destinations/new', {
      title: "Add a Destination",
      destinations
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function create(req, res) {
  Destination.create(req.body)
  .then(destination => {
    res.redirect(`/destinations`)
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function show(req, res) {
  console.log('show function running')
  Destination.findById(req.params.id)
  .then(destination => {
    res.render('destinations/show', {
      destination,
      title: `${destination.city}, ${destination.country}`
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function createReview(req, res) {
  console.log(req.params.id, 'destinationID')
  console.log(req.body, 'req.body')
  console.log(req.body.rating, 'req.body.rating')
  console.log(req.user, 'req.user')

  console.log(req.user.profile.name, 'req.user.profile.name')
  //req.body.author = req.user.profile.name     // THIS WONT WORK - NEED TO REFERENCE USER ID AND THEN POPULATE THE NAME

  req.body.author = req.user.profile._id
  req.body.recommend = !!req.body.recommend   // checkbox massaging
  Destination.findById(req.params.id)
  .then(destination => {
    destination.reviews.push(req.body)
    destination.save()
    .then(() => {
      res.redirect(`/destinations/${destination._id}`)
    })
    .catch(err => {
      console.log(err, 'ERROR')
      res.redirect('/destinations')
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function deleteReview(req, res){
  console.log('deleteReview function working')
  Destination.findById(req.params.destinationId)
  .then(destination => {
    destination.reviews.remove({_id: req.params.reviewId})
    destination.save()
    .then(() => {
      res.redirect(`/destinations/${destination._id}`)
    })
    .catch(err => {
      console.log(err, 'ERROR')
      res.redirect('/destinations')
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function readReview(req, res) {
  // .populate('reviews')
  console.log('read review function is running')
  console.log(req.params.destinationId, 'req.params.destinationId')
  console.log(req.params.reviewId, 'req.params.reviewId')
  console.log(req.params, 'req.params')
  Destination.findById(req.params.destinationId)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  })
  .then(destination => {
    const review = destination.reviews.id(req.params.reviewId)
    console.log(review, 'REVIEW')
    res.render('reviews/show', {
      title: 'Review',
      destination, 
      review
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function editReview(req, res) {
  console.log('editReview')
  Destination.findById(req.params.destinationId)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  })
  .then(destination => {
    const review = destination.reviews.id(req.params.reviewId)
    // console.log(review, 'REVIEW')
    res.render('reviews/edit', {
      title: 'Edit Review',
      destination,
      review,
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

function updateReview(req, res) {
  // console.log('updateReview function running')
  console.log(req.body, 'req.body - UPDATE REVIEW')
  // delete blank inputs
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  // find destination with the review
  Destination.findById(req.params.destinationId)
  .then(destination => {
    req.body.recommend = !!req.body.recommend   // checkbox handling
    // find and set subdocument (review)
    const review = destination.reviews.id(req.params.reviewId)
    console.log(review, 'REVIEW')
    if(review.author._id.equals(req.user.profile._id)) {
      // the person making the req owns the review
      review.set(req.body)
      destination.save()
      .then(() => {
        res.redirect(`/destinations/${destination._id}/reviews/${review._id}`)
      })
    } else {
      // the person making the req does not own the review
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect(`/destinations`)
  })
}

export {
  index,
  newDestination as new,
  create,
  show,
  createReview,
  deleteReview,
  readReview,
  editReview,
  updateReview,
}