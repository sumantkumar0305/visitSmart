import express from "express";
import passport from "passport";
import { isLoginCheck, saveUserData, userLogin, userLogout} from '../Controllers/userController.js'
 
const router = express.Router();

router.post('/signup', saveUserData);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile", isLoginCheck);

export default router;  