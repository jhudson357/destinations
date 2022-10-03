import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  dateVisited: Date,
  rating: Number,
  recommend: Boolean,
  review: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
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