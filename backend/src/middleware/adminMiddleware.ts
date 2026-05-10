import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

export const verifyAdmin =
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader =
        req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({
            message:
              "Unauthorized",
          });
      }

      const token =
        authHeader.split(" ")[1];

      jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );

      next();
    } catch (error) {
      return res.status(401).json({
        message:
          "Invalid token",
      });
    }
  };
