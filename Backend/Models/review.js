import mongoose from "mongoose";
import user from './User.js';

const reviewSchema = new mongoose.Schema(
    {
        rating:{
            type: Number,
            required: true,
            min: 0, 
            max: 5
        },
        comment: {
            type: String, 
            required: true,
            maxlength: 1000 
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("review", reviewSchema);