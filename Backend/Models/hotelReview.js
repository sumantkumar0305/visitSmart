import mongoose from "mongoose";
import user from './User.js';

const hotelReviewSchema = new mongoose.Schema(
        {
            rating: {
                type: Number,
                required: true,
                min: 0,
                max: 5,
            },
            comment: {
                type: String,
                required: true,
                maxlength: 1000,
                trim: true, // ✅ good to trim extra spaces
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user", // ✅ must match model name exactly
                required: true,
            },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("hotelReview", hotelReviewSchema);