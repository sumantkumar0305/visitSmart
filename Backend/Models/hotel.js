import mongoose, { Schema, model } from "mongoose";
import hotelReview from "./hotelReview.js"; 
import User from "./User.js";

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
    doubleAC_Price: {
      type: Number,
      default: 0
    },
    singleAC_Price: {
      type: Number,
      default: 0
    },
    doubleNonAC_Price: {
      type: Number,
      default: 0
    },
    singleNonAC_Price: {
      type: Number,
      default: 0
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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