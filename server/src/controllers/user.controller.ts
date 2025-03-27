import { userService } from "../services/user.service";
import { tryCatch } from "../lib/try-catch";
import { type Request, type Response } from "express";
import { generateToken } from "../lib/jwt";

export const register = async (req: Request, res: Response) => {
  const { data, error } = await tryCatch(
    (async () => {
      const hashedPassword = await userService.hashPassword(req.body.password);
      const user = await userService.createUser({
        ...req.body,
        password: hashedPassword,
      });
      return user;
    })()
  );

  if (error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }
  const token = generateToken({ id: data.id });
  res
    .status(201)
    .json({ success: true, token, message: "User created succesfully" });
  return;
};

export const login = async (req: Request, res: Response) => {
  const { data, error } = await tryCatch(
    (async () => {
      const user = await userService.getUserByEmail(req.body.email);
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await userService.verifyPassword(
        user.password,
        req.body.password
      );
      if (!isValid) {
        throw new Error("Invalid password");
      }
      return user;
    })()
  );

  if (error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }
  const token = generateToken({ id: data.id });
  res.status(200).json({ success: true, token, message: "User logged in" });
  return;
};
