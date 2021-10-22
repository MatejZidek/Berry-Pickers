const mongoose = require('mongoose')

const coordsSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
})

const destinationSchema = new mongoose.Schema({
  coords: {
    type: coordsSchema,
    required: true,
  },
  ETA: {
    type: Date,
    default: Date.now,
  },
  visited: {
    type: Boolean,
    default: false,
  }
})

const locationSchema = new mongoose.Schema({
  coords: {
    type: coordsSchema,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})


const routeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  // url: {
  //   type: String,
  //   required: true,
  // },
  destinations: {
    type: [destinationSchema],
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  locationHistory: {
    type: [locationSchema],
  }
})

routeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Route', routeSchema)