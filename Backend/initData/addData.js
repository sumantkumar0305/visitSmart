import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";

import SiteData from "../Models/SiteData.js";
import sites from "./site.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});

try {
    await mongoose.connect(process.env.MONGOURL);

    console.log("MongoDB connected successfully!");

    await SiteData.insertMany(sites);

    console.log("Tourism sites inserted successfully!");

} catch (error) {
    console.log("Error:", error);
} finally {
    await mongoose.connection.close();
}
