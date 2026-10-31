
import mongoose from "mongoose";
import app, { configureApp } from "./app.js";
import { connectDB } from "./config/db.js";

let server;
let shuttingDown = false;

export const startServer = async () => {
  try {
    await connectDB();

    configureApp();

    const port = process.env.PORT || 8000;

    server = app.listen(port, () => {
      console.log("--------------------------------");
      console.log("VisitSmart Backend Started!");
      console.log(`Server: http://localhost:${port}`);
      console.log("MongoDB: Connected");
      console.log("--------------------------------");
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    await shutdown("startup failure", 1);
  }
};

export async function shutdown(signal, exitCode = 0) {
  if (shuttingDown) return;

  shuttingDown = true;

  console.log(`Received ${signal}; shutting down.`);

  const forceExit = setTimeout(() => {
    process.exit(exitCode);
  }, 10000);

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
