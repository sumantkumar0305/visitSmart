import express from "express";
import multer from "multer";
import { storage } from "../CloudConfig.js";
import { findSingalHotel, saveHotelData } from "../Controllers/hotelController.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/data/save/:siteId',  upload.array("images"), saveHotelData);
router.get('/find/singal/data/:hotelId', findSingalHotel);

export default router;