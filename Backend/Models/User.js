import { request } from "express";
import mongoose from "mongoose";
import Order from "./Order.js";
import Notification from "./Notification.js";

const userSchema = new mongoose.Schema({
    username:{
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        required: true,
    },
    countryCode: {
        type: "String",
        required: true
    },
    DOB: {
        type: "String",
        default: null
    },
    phoneNumber: {
        type: "String",
        required: true
    },
    password: {
        type:"String",
        required: true
    },
});
 
export default mongoose.model("User", userSchema);