import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  dateVisited: String,
  rating: Number,
  recommend: Boolean,
  title: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  // author: String,
}, {
  timeStamps: true,
})

const destinationSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  continent: {
  type: String,
  required: true,
  },
  reviews: [reviewSchema]
}, {
  timestamps: true,
})

const Destination = mongoose.model('Destination', destinationSchema)

export {
  Destination
}