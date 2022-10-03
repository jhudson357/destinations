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
  console.log('new destination is running')
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

export {
  index,
  newDestination as new,
  create,
  show,
}