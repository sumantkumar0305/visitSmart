import mongoose, { Schema, model } from "mongoose";
import hotelReview from "./hotelReview.js"; // ✅ add .js extension for ES Modules

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    aboutHotel: {
      type: String,
      required: true,
      minlength: 3, // ✅ use “minlength” instead of “min” for strings
    },
    image: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one image is required.",
      }
    },
    price: {
      type: Number,
      required: true,
      min: 0, // ✅ ensure price is non-negative
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // ✅ ensure valid 6-digit Indian pincode
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hotelReview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ✅ Don't forget to export the model
export default model("hotel", hotelSchema);