import mongoose, { Schema, model } from "mongoose"; 
import review from "./review.js";

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
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  image4: {
    type: String,
    required: true,
  },
  review:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
    },
  ],
  },
  {
    timestamps: true,
  }
);

export default model("Site", siteSchema);