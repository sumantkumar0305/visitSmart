import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import siteRoutes from "./Routes/siteRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import hotelRoutes from "./Routes/hotelRoutes.js";
import { findSingalReview } from "./Controllers/reviewController.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passportConfig.js";
import { requireTrustedOrigin } from "./middleware.js";

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.FRONTEND_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!isProduction && allowedOrigins.length === 0) {
  allowedOrigins.push("http://localhost:5173", "http://127.0.0.1:5173");
}

const requiredVariables = [
  "MONGOURL",
  "SESSION_KEY",
  "CLOUD_NAME",
  "CLOUD_API_KEY",
  "CLOUD_API_SECRET",
];
const missingVariables = requiredVariables.filter(
  (name) => !process.env[name]?.trim()
);

if (isProduction && allowedOrigins.length === 0) {
  missingVariables.push("FRONTEND_ORIGINS");
}
if (isProduction && (process.env.SESSION_KEY?.length ?? 0) < 32) {
  throw new Error("SESSION_KEY must be at least 32 characters in production.");
}
if (missingVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(", ")}`
  );
}

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("VisitSmart API is running");
});

app.get("/healthz", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "ok" : "unavailable",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

let server;
let shuttingDown = false;

async function shutdown(signal, exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Received ${signal}; shutting down.`);

  const forceExit = setTimeout(() => process.exit(exitCode), 10_000);
  forceExit.unref();

  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.disconnect();
  clearTimeout(forceExit);
  process.exit(exitCode);
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  void shutdown("unhandledRejection", 1);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  void shutdown("uncaughtException", 1);
});

async function startServer() {
  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected; Mongoose will attempt to reconnect.");
  });
  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected.");
  });
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  await mongoose.connect(process.env.MONGOURL, {
    serverSelectionTimeoutMS: 10_000,
  });
  console.log("MongoDB connected.");

  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    crypto: { secret: process.env.SESSION_KEY },
    touchAfter: 24 * 60 * 60,
  });
  sessionStore.on("error", (error) => {
    console.error("Mongo session store error:", error);
  });

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(requireTrustedOrigin(allowedOrigins));

  app.use("/user", userRoutes);
  app.use("/site/data", siteRoutes);
  app.use("/site/review", reviewRoutes);
  app.get("/find/singal/review/:reviewId", findSingalReview);
  app.use("/hotel", hotelRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
  });

  app.use((err, _req, res, _next) => {
    const status =
      err.name === "MulterError"
        ? err.code === "LIMIT_FILE_SIZE"
          ? 413
          : 400
        : Number.isInteger(err.status)
          ? err.status
          : 500;
    if (status >= 500) {
      console.error("Unhandled request error:", err);
    }
    res.status(status).json({
      message: status >= 500 ? "Internal server error" : err.message,
    });
  });

  const port = process.env.PORT || 8000;
  server = app.listen(port, () => {
    console.log(`VisitSmart API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  void shutdown("startup failure", 1);
});
