import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./infra/routes";
import AppError from "./errors/AppError";
import { errors } from "celebrate";

const app = express();

app.use(express.json());
app.use(router);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

const PORT = process.env.PORT ?? 3003;

app.listen(PORT, () =>
  console.log(`Server product is running on PORT ${PORT}`)
);
