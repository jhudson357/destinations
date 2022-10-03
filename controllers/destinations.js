import { Destination } from "../models/destination.js"

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
  res.render('destinations/new', {
    title: "Add a Destination That You've Visited"
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
      title: `${destination.city}, ${destination.country} Reviews`
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/destinations')
  })
}

// function newReviewForm(req, res) {
//   console.log(req.body, 'req.body')
//   res.render('destinations/newReview', {
//     title: `Write a Review`
//   })
// }

function createReview(req, res) {
  // console.log(req.params.id, 'destinationID')
  // console.log(req.body, 'req.body')
  // console.log(req.body.rating, 'req.body.rating')
  // console.log(req.user, 'req.user')
  // console.log(req.user.profile.name, 'req.user.profile.name')
  req.body.author = req.user.profile.name
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

export {
  index,
  newDestination as new,
  create,
  show,
  // newReviewForm,
  createReview,
  deleteReview,
}