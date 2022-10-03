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

export {
  index,
  show,
}