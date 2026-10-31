
import express from "express";
import cors from "cors";
import passport from "passport";

import { corsOptions, default as allowedOrigins } from "./config/corsOptions.js";
import { createSessionConfig } from "./config/sessionConfig.js";

import userRoutes from "./Routes/userRoutes.js";
import siteRoutes from "./Routes/siteRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import hotelRoutes from "./Routes/hotelRoutes.js";

import { findSingalReview } from "./Controllers/reviewController.js";
import { requireTrustedOrigin } from "./middleware.js";

import "./passportConfig.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

// Basic configuration
app.set("trust proxy", 1);

// Express middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors(corsOptions));

// Basic routes
app.get("/", (_req, res) => {
  res.send("VisitSmart API is running");
});

app.get("/healthz", (_req, res) => {
  res.json({
    status: "ok",
    database: "connected",
  });
});

// Session and authentication
export const configureApp = () => {
  app.use(createSessionConfig(isProduction));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(requireTrustedOrigin(allowedOrigins));

  // Application routes
  app.use("/user", userRoutes);
  app.use("/site/data", siteRoutes);
  app.use("/site/review", reviewRoutes);

  app.get(
    "/find/singal/review/:reviewId",
    findSingalReview
  );

  app.use("/hotel", hotelRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      message: `Route not found: ${req.method} ${req.path}`,
    });
  });

  // Error handler
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
      console.error("Request error:", err);
    }

    res.status(status).json({
      message:
        status >= 500
          ? "Internal server error"
          : err.message,
    });
  });
};

export default app;
