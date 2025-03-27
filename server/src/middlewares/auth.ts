import { verifyToken, type Payload } from "../lib/jwt"; // Assuming verifyToken returns a JwtPayload
import { type Request, type Response, type NextFunction } from "express";
import { tryCatch } from "../lib/try-catch";

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: Payload; // Define the type for the user object
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { data, error } = await tryCatch(
    (async () => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw new Error("Authorization header missing");
      }

      const [scheme, token] = authorizationHeader.split(" ");

      if (scheme !== "Bearer" || !token) {
        throw new Error("Invalid authorization format");
      }

      return verifyToken(token);
    })()
  );

  if (error) {
    return res.status(401).json({ success: false, message: error.message }); // Send specific error
  }

  req.user = data;
  next();
};
