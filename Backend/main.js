import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";
import userRoutes from './Routes/userRoutes.js';
import siteRoutes from './Routes/siteRoutes.js';
import review from "./Routes/reviewRoutes.js";
import hotelRoutes from './Routes/hotelRoutes.js'
import { findSingalReview } from "./Controllers/reviewController.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passportConfig.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


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

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: dburl}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false,       // ❗ important for localhost (HTTP)
    sameSite: "lax"
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res)=>{
    res.send("Hello i am hearing");
})

app.use('/user', userRoutes);
app.use('/site/data', siteRoutes);
app.use('/site/review', review);
app.use('/find/singal/review/:reviewId', findSingalReview);
app.use('/hotel', hotelRoutes);


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`🚀 Server is running on http://localhost:${port}`);
}) 