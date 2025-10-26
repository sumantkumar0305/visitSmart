import express from "express";
import { saveUserData } from '../Controllers/userController.js'
 
const router = express.Router();

router.post('/save', saveUserData);

export default router;