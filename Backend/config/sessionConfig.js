
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export const createSessionConfig = (isProduction) => {
  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),

    crypto: {
      secret: process.env.SESSION_KEY,
    },

    touchAfter: 24 * 60 * 60,
  });

  sessionStore.on("error", (error) => {
    console.error("Mongo session store error:", error);
  });

  const sessionMiddleware = session({
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
  });

  return sessionMiddleware;
};
