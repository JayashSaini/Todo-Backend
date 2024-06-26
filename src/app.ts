import express from "express";
import { errorHandler } from "./middlewares/error.middlewares.js";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

function startApp() {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );

  app.use(
    express.json({
      limit: "50mb",
    })
  );
  app.use(
    express.urlencoded({
      limit: "50",
      extended: true,
      parameterLimit: 50000,
      type: "application/x-www-form-urlencoded",
    })
  );

  app.use(cookieParser());

  app.use("/api/v1/todo", todoRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/healthcheck", healthcheckRouter);

  // Implemented error handling middleware
  app.use(errorHandler);
}

export { app, startApp };
