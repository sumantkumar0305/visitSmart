import bcrypt from "bcrypt";
import express from "express";
import passport from "passport";
import userSchema from "../Models/User.js";

export const saveUserData = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const existingUser = await userSchema.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already exists", type: "error" });

    const salt = await bcrypt.genSalt(11);
     const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userSchema({
      username,
      email,
      phoneNumber: phone,
      password: hashedPassword,
    });

    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Sign up failed please try again", type: "error" });
      }
      const { password, ...safeUser } = newUser.toObject();
      return res.status(201).json({
        message: "User registered and logged in successfully",
        user: safeUser,
        type: "success",
      });
    });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ message: "Server error! Sign up again", type: "error" });
  }
};


export const userLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed! please tyr again",
        type: "error",
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Logged in successfully",
        type: "success",
        user,
      });
    });
  })(req, res, next);
}

export const userLogout = async (req, res) => {
  req.logout(err => {
    if (err) return res.status(400).json({message: "Some error is happend", type: "error"});
    req.session.destroy(); // optional: fully clear session
    res.clearCookie('connect.sid'); // name of your session cookie
    res.status(200).json({ message: 'Log out successfully', type: "success" });
  });
};


export const isLoginCheck = (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user, isAuthenticated: true });   
  } else {
    return res.status(200).json({ user: null, isAuthenticated: false });
  }
}