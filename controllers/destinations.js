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
  console.log('create function is working')
  Destination.create(req.body)
  .then(destination => {
    res.redirect(`/destinations`)
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
}