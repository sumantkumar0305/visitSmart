import mongoose from "mongoose";
import hotel from "../Models/hotel.js";
import hotelReview from "../Models/hotelReview.js";

export const saveHotelReview = async(req, res)=>{
    try{
        const {hotelId} = req.params;
        const {rating, comment} = req.body;

        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json({ message: "Invalid hotel ID", type: "error" });
        }

        const hotelData = await hotel.findById(hotelId);
        if (!hotelData) {
            return res.status(404).json({ message: "Sorry, we couldn't find the hotel you're looking for.", type: "error" });
        }

        const newReview = new hotelReview({ rating, comment, author: req.user._id });
        await newReview.save();
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
            return res.status(400).json({ message: "Invalid review ID", type: "error" });
        }
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json({ message: "Invalid hotel ID", type: "error" });
        }

        const hotelData = await hotel.findById(hotelId);
        if (!hotelData) {
            return res.status(404).json({ message: "Hotel not found", type: "error" });
        }
        if (!hotelData.review.some((id) => id.toString() === reviewId)) {
            return res.status(404).json({ message: "Review not found for this hotel", type: "error" });
        }
        const reviewToDelete = await hotelReview.findById(reviewId);
        if (!reviewToDelete) {
            return res.status(404).json({ message: "Review not found", type: "error" });
        }
        if (reviewToDelete.author?.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own reviews", type: "error" });
        }
        await reviewToDelete.deleteOne();
        hotelData.review.pull(reviewToDelete._id);
        await hotelData.save();


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
            return res.status(400).json({ message: "Invalid review ID", type: "error" });
        }
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json({ message: "Invalid hotel ID", type: "error" });
        }

        const hotelData = await hotel.findById(hotelId);

        if (!hotelData) {
            return res.status(404).json({ message: "Hotel not found", type: "error" });
        }


        if (!hotelData.review.some((id) => id.toString() === reviewId)) {
            return res.status(400).json({ message: "Invalid review for this hotel" });
        }

        const reviewToEdit = await hotelReview.findById(reviewId);
        if (!reviewToEdit) {
            return res.status(404).json({ message: "Review not found", type: "error" });
        }
        if (reviewToEdit.author?.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only edit your own reviews", type: "error" });
        }

        const {rating, comment} = req.body;
        reviewToEdit.rating = rating;
        reviewToEdit.comment = comment;
        await reviewToEdit.save();

        res.status(200).json({
            message: 'Review updated successfully.',
            type: "success"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message || "Your review is not Edit(Server error)", type: "error" });
    }
}