import express from "express";
import multer from "multer";
import { storage } from "../CloudConfig.js";
import { deleteHotelData, findSingalHotel, saveHotelData } from "../Controllers/hotelController.js";
import { deleteHotelReview, editHotelReview, saveHotelReview } from "../Controllers/hotelReviewController.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/data/save/:siteId',  upload.array("images"), saveHotelData);
router.get('/find/singal/data/:hotelId', findSingalHotel);
router.post('/review/save/:hotelId/:authorId', saveHotelReview);  
router.delete('/review/delete/:reviewId/:hotelId', deleteHotelReview);
router.put('/review/edit/:reviewId/:hotelId', editHotelReview);
router.delete('/data/remove/:hotelID', deleteHotelData)

export default router;