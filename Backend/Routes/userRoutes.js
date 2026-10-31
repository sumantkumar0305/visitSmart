import express from "express";
import passport from "passport";
import { isLoginCheck, saveUserData, updateProfile, userLogin, userLogout} from '../Controllers/userController.js'
import { requireAuth } from "../middleware.js";
 
const router = express.Router();

router.post('/signup', saveUserData);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile", isLoginCheck);
router.put("/update/profile/:userID", requireAuth, updateProfile)

export default router;  