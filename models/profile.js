import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bucketListSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    min: 2022,
    max: 2100,
    required: true,
  },
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  bucketListDestinations: [bucketListSchema],
  destinations: [{type: Schema.Types.ObjectId, ref: 'Destination'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
