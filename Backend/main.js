import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";
import userRoutes from './Routes/userRoutes.js';
import siteRoutes from './Routes/siteRoutes.js';
import review from "./Routes/reviewRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


//========== Connect DataBase ======
const dburl = process.env.MONGOURL

const connectDB = async() =>{
    try{
        await connect(dburl);
        console.log("✅ MongoDB Connected Successfully");
    }catch(err){
        console.error("❌ MongoDB Connection Failed:", err.message);
    }
}
connectDB();

app.get('/', (req,res)=>{
    res.send("Hello i am hearing");
})

app.use('/user/data', userRoutes);
app.use('/site/data', siteRoutes);
app.use('/site/review', review);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`🚀 Server is running on http://localhost:${port}`);
}) 