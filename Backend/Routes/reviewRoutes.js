import express from "express";
import { deleteReview, editReview, fetchReview, saveReview } from "../Controllers/reviewController.js";
import { requireAuth } from "../middleware.js";

const router = express.Router();

router.post('/save/:ID/:authorId', requireAuth, saveReview);
router.get('/fetch/:id', fetchReview);
router.post('/delete/:reviewId', requireAuth, deleteReview);
router.put('/edit/:reviewId', requireAuth, editReview)

export default router;