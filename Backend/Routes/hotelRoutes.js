import express from "express";
import multer from "multer";
import { deleteHotelData, findSingalHotel, saveHotelData } from "../Controllers/hotelController.js";
import { deleteHotelReview, editHotelReview, saveHotelReview } from "../Controllers/hotelReviewController.js";
import { requireAuth } from "../middleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

const router = express.Router();

router.post('/data/save/:siteId', requireAuth, upload.array("images"), saveHotelData);
router.get('/find/singal/data/:hotelId', findSingalHotel);
router.post('/review/save/:hotelId/:authorId', requireAuth, saveHotelReview);
router.delete('/review/delete/:reviewId/:hotelId', requireAuth, deleteHotelReview);
router.put('/review/edit/:reviewId/:hotelId', requireAuth, editHotelReview);
router.delete('/data/remove/:hotelID', requireAuth, deleteHotelData)

export default router;