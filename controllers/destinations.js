import { Destination } from "../models/destination.js"

function index(req, res) {
  console.log('destinations pg is good')
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

export {
  index,
}