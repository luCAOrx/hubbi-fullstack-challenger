import { NextFunction, type Request, type Response } from "express";

import { BaseController } from "@infra/http/controllers/base-controller";

export const pageNotFoundError = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  BaseController.notFound({
    response,
    message: {
      statusCode: 404,
      message: "Page not found",
      error: "Not Found",
    },
  });

  next();
};
