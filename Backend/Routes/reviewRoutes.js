import express from "express";
import { deleteReview, editReview, fetchReview, saveReview } from "../Controllers/reviewController.js";

const router = express.Router();

router.post('/save/:id', saveReview);
router.get('/fetch/:id', fetchReview);
router.post('/delete/:reviewId', deleteReview);
router.put('/edit/:reviewId', editReview)

export default router;