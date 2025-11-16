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