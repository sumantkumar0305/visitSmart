import siteSchema from "../Models/SiteData.js";
import review from "../Models/review.js";
import mongoose from "mongoose";


export const saveReview = async(req,res)=>{
    try{
        const {ID, authorId} = req.params;
        const {rating, comment} = req.body;  

        if (!mongoose.Types.ObjectId.isValid(ID)) {
            return res.status(500).json({ message: "Invalid site ID", type: "error" });
        }   

        const newReview = new review({ rating, comment, author: authorId });
        await newReview.save();
        
        const site = await siteSchema.findById(ID);
        if (!site) {
            return res.status(404).json({ message: "Sorry, we couldn't find the palace you're looking for.", type: "error" });
        }

        site.review.push(newReview._id);
        await site.save();

        res.status(201).json({ message: "Thank you for your feedback", type: "success" });
    }catch(err){
        console.error("Error saving data:", err);
        res.status(500).json({ message: err.message || "Your review is not save(Server error)", type: "error" });
    }
};

export const fetchReview = async(req, res)=>{
    try{
        const ID = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(ID)) {
            return res.status(500).json({ message: "Invalid site ID", type: "error" });
        }

        const site = await siteSchema.findById(ID);
        if (!site) {
            return res.status(404).json({ message: "Sorry, we couldn't find the palace you're looking for.", type: "error" });
        }
        const reviewID = site.review;
        const reviewData = await review.find({ _id: { $in: reviewID } });

        res.status(200).json(reviewData);
    }catch(err){
        console.error("Error saving data:", err);
        res.status(500).json({ message: err.message || "Your review is not find(Server error)", type: "error" });
    }
};

export const deleteReview = async(req,res)=>{
    try{
        let reviewId = req.params.reviewId;
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(500).json({ message: "Invalid site ID", type: "error" });
        }
        await review.findByIdAndDelete(reviewId);

        await siteSchema.updateOne(
            { review: reviewId },
            { $pull: { review: reviewId } } // remove from array
        );

        res.status(201).json({ message: "Your feedback delete successful", type: "success" });
    }catch(err){
        console.error("Error saving data:", err);
        res.status(500).json({ message: err.message || "Your review is not delete(Server error)", type: "error" });
    }
};

export const editReview = async(req, res)=>{
    try{
        let reviewId = req.params.reviewId;
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(500).json({ message: "Invalid site ID", type: "error" });
        }
        const {rating, comment} = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: 'Rating and comment are required.', type: "error" });
        }
        
        const updatedReview = await review.findByIdAndUpdate(
            reviewId,
            { rating, comment },
        );

        res.status(200).json({
            message: 'Review updated successfully.',
            type: "success"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message ||"Your review is not update(Server error)", type: "error" });
    }
}

export const findSingalReview = async(req,res)=>{
    try{
        const ID = req.params.reviewId;
        if (!mongoose.Types.ObjectId.isValid(ID)) {
            return res.status(500).json({ message: "Invalid site ID", type: "error" });
        }
        const reviewData = await review.findById(ID);
        
        res.status(200).json(reviewData);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message || "Server error", type: "error" });
    }
}