import { Profile } from "../models/profile.js"

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
  console.log('show function - profiles')
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      title: `${profile.name}'s Profile`,
      profile,
      isSelf,
    })
  })
  .catch(err => {
    console.log(err, 'ERROR')
    res.redirect('/profiles')
  })
}

function createBucketListDestination(req, res) {
  console.log('createBucketListdestination')
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

export {
  index,
  show,
  createBucketListDestination,
}