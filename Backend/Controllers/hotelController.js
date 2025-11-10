import mongoose from "mongoose";
import siteSchema from "../Models/SiteData.js";
import hotel from "../Models/hotel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const saveHotelData = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    if (!mongoose.Types.ObjectId.isValid(siteId)) {
      return res.status(400).json({ message: "Invalid site ID", type: "error" });
    }


    const hotelData = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded", type: "error" });
    }

    // Upload all files to Cloudinary and get URLs
    const uploadedPaths = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "VisitSmart" },
              (error, result) => {
                if (result) resolve(result.secure_url); // <-- this is the path to save in DB
                else reject(error);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          })
      )
    );

    const newHotel = new hotel({
      name: hotelData.name,
      aboutHotel: hotelData.aboutHotel,
      image: uploadedPaths,
      city: hotelData.city,
      pincode: hotelData.pincode,
      price: hotelData.price
    })
    await newHotel.save();
    
    const site = await siteSchema.findById(siteId);
    if (!site) {
      return res.status(404).json({ message: "Sorry, we couldn't find the palace you're looking for.", type: "error" });
    }

    site.hotel.push(newHotel._id);
    await site.save();

    res.status(201).json({ message: "Your hotel data saved successfully", type: "success" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ message: err.message || "Your hotel data was not saved (Server error)", type: "error" });
  }
};


export const findSingalHotel = async(req, res)=>{
  try{
    const hotelId = req.params.hotelId;
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: "Invalid site ID", type: "error" });
    }

    const hotelData = await hotel.findById(hotelId);
    res.status(200).json(hotelData);
  }catch(err){
    console.log(err);
  }
}