import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: String,
      require:true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    transimsion: {
        type: String,
        required: true,
    },
    milage: {
        type: Number,
        required: true,
    },
    photos: {
      type: [String],
    },
    maxPassengers: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    books: {
      type: [String],
    },
    fuelType: {
        type: String,
        required: true,
    },
    noOfDoors: {
        type: Number,
        required: false,
    },
    sizeClass: {
        type: String,
        required: true,
    },
    isAirConditioning: {
      type: Boolean,
      default: false,
    },
    isGpsNavigation: {
        type: Boolean,
        default: false,
    },
    isSunroof: {
        type: Boolean,
        default: false,
    },
    isAntiLockBrakes: {
        type: Boolean,
        default: false,
    },
    isAirbags: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    viewCount: {
        type: Number,
        required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);