import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  dateVisited: String,
  rating: Number,
  recommend: Boolean,
  title: String,
  review: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  // author: String,
}, {
  timeStamps: true,
})

const destinationSchema = new Schema({
  city: String,
  country: String,
  continent: String,
  reviews: [reviewSchema]
}, {
  timestamps: true,
})

const Destination = mongoose.model('Destination', destinationSchema)

export {
  Destination
}