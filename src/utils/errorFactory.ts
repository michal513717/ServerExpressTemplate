import { CommonRoutesConfig } from "../common/common.routes.config";
import { ERROR_CODES } from "./errorCodes";
import type { Response } from "express";
import { z } from "zod";

export class ErrorsFactory {
  public static validationErrorResponse(res: Response, error: z.ZodError): Response {
    return res.status(400).json({
      status: CommonRoutesConfig.statusMessage.FAILED,
      code: ERROR_CODES.VALIDATION_ERROR,
      message: error.format()
    })
  }

  public static internalServerErrorResponse(res: Response): Response {
    return res.status(500).json({
      status: CommonRoutesConfig.statusMessage.FAILED,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error, please try again later"
   })
  }
}