import { Profile } from "../models/profile.js"
import { Destination } from "../models/destination.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'Profiles'
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('destinations')
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    Destination.find({_id: {$nin: profile.destinations}})
    .then(destinations => {
      res.render('profiles/show', {
        title: `${profile.name}'s Profile`,
        profile,
        isSelf,
        destinations,
      })
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/profiles')
  })
}

function createBucketListDestination(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.bucketListDestinations.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${profile._id}`)
    })
    .catch(err => {
      console.log(err, 'ERROR')
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect(`/profiles/${profile._id}`)
  })
}

function deleteBucketListDestination(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.bucketListDestinations.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function addDestination(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.destinations.push(req.body.destinationId)
    profile.save()
    .then(() => {
      res.refirect(`/profiles/${profile._id}`)
    })
    .catch(err => {
      console.log(err, 'ERROR')
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createBucketListDestination,
  deleteBucketListDestination,
  addDestination,
}