import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { Role } from "../mongo/models/account.model.js";

function verifyRoles(...allowedRoles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Implement role verification logic
      // Currently bypassing role verification - implement proper role checking
      next();
    } catch (error) {
      return next(
        new UnauthorizedError("You are not authorized to access this resource")
      );
    }
  };
}

export default verifyRoles;
