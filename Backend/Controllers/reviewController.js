import siteSchema from "../Models/SiteData.js";
import review from "../Models/review.js";
import mongoose from "mongoose";

export const saveReview = async(req,res)=>{
    try{
        const ID = req.params.id;
        const {rating, comment} = req.body;

        const newReview = new review({ rating, comment });
        await newReview.save();
        
        const site = await siteSchema.findById(ID);
        if (!site) {
        return res.status(404).json({ message: "Site not found", type: "error" });
        }

        site.review.push(newReview._id);
        await site.save();

        res.status(201).json({ message: "Thank you for your feedback", type: "success" });
    }catch(err){
        console.error("Error saving data:", err);
        res.status(500).json({ message: "Server error", type: "error" });
    }
};

export const fetchReview = async(req, res)=>{
    try{
        const ID = req.params.id;
        const site = await siteSchema.findById(ID);
        if (!site) {
            return res.status(404).json({ message: "Site not found", type: "error" });
        }
        const reviewID = site.review;
        const reviewData = await review.find({ _id: { $in: reviewID } });

        res.status(200).json(reviewData);
    }catch(err){
        console.error("Error saving data:", err);
        res.status(500).json({ message: err.message || "Server error", type: "error" });
    }
};

export const deleteReview = async(req,res)=>{
    try{
        let reviewId = req.params.reviewId;
        await review.findByIdAndDelete(reviewId);

        res.status(201).json({ message: "Your feedback delete successful", type: "success" });
    }catch(err){
        console.error("Error saving data:", err);
        res.status(500).json({ message: err.message || "Server error", type: "error" });
    }
};

export const editReview = async(req, res)=>{
    try{
        let reviewId = req.params.reviewId;
        const {rating, comment} = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: 'Rating and comment are required.', type: "error" });
        }
        
        const updatedReview = await review.findByIdAndUpdate(
            reviewId,
            { rating, comment },
        );

        console.log(updatedReview);
        res.status(200).json({
            message: 'Review updated successfully.',
            type: "success"
        });
    }catch(err){
        res.status(500).json({ message: err.message || "Server error" });
    }
}