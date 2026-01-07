import mongoose from "mongoose";
import hotel from "../Models/hotel.js";
import User from "../Models/User.js";
import hotelReview from "../Models/hotelReview.js";

export const saveHotelReview = async(req, res)=>{
    try{
        const {hotelId, authorId} = req.params;
        const {rating, comment} = req.body;

        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(500).json({ message: "Invalid hotel ID", type: "error" });
        }  
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(500).json({ message: "Invalid author ID", type: "error" });
        }  
   
        const newReview = new hotelReview({ rating, comment, author: authorId });
        await newReview.save();

        const hotelData = await hotel.findById(hotelId);
        if (!hotelData) {
            return res.status(404).json({ message: "Sorry, we couldn't find the hotel you're looking for.", type: "error" });
        }

        hotelData.review.push(newReview._id);
        await hotelData.save();

        res.status(201).json({ message: "Thank you for your feedback", type: "success" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message || "Your review is not save(Server error)", type: "error" });
    }
}

export const deleteHotelReview = async(req, res)=>{
    try{
        const {reviewId, hotelId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(500).json({ message: "Invalid review ID", type: "error" });
        }
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(500).json({ message: "Invalid hotel ID", type: "error" });
        }
        await hotelReview.findByIdAndDelete(reviewId);

        await hotel.findByIdAndUpdate(
            hotelId,
            { $pull: { review: reviewId } }
        );


        res.status(200).json({ message: "Your feedback deleted successfully", type: "success" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message || "Your review is not delete(Server error)", type: "error" });
    }
}

export const editHotelReview = async(req, res)=>{
    try{
        const {reviewId, hotelId} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(500).json({ message: "Invalid review ID", type: "error" });
        }
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(500).json({ message: "Invalid hotel ID", type: "error" });
        }

        const hotelData = await hotel.findById(hotelId);

        if (!hotelData) {
            return res.status(404).json({ message: "Hotel not found", type: "error" });
        }


        if (!hotelData.review.includes(reviewId)) {
            return res.status(400).json({ message: "Invalid review for this hotel" });
        }

        console.log(hotelData);
        console.log(reviewId);

        const {rating, comment} = req.body;
        console.log(rating);
        console.log(comment);

        const updatedReview = await hotelReview.findByIdAndUpdate(
            reviewId, 
            {rating, comment}
        );

        if (!updatedReview) {
        return res.status(404).json({
            message: "Review not found",
            type: "error"
        });
        }

        res.status(200).json({
            message: 'Review updated successfully.',
            type: "success"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message || "Your review is not Edit(Server error)", type: "error" });
    }
}