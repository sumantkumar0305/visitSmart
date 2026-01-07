import express from "express";
import { findSingalData, findSiteData } from "../Controllers/siteController.js";
const router = express.Router();

router.get('/find', findSiteData);

router.get('/find/by/:id', findSingalData)

export default router; 