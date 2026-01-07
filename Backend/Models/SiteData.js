import mongoose, { Schema, model } from "mongoose"; 
import review from "./review.js";
import hotel from "./hotel.js";
import User from "./User.js";

const siteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    pincode: {
    type: String,
    required: true,
    maxlength: 6,
  },
  image: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "At least one image is required.",
    }
  },
  review:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
    },
  ],
  hotel:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hotel",
    },
  ],
  siteAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  },
  {
    timestamps: true,
  }
);

export default model("Site", siteSchema);