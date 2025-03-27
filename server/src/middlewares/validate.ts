import { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = schema.safeParse(req.body);

    if (error) {
      res.status(400).json({ success: false, message: error.errors });
      return;
    }

    req.body = data;
    next();
  };
};
