import * as jwt from "jsonwebtoken";

export type Payload = {
  id: string;
};

export const verifyToken = (token: string): Payload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as Payload;
};
export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
};
