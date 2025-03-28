import { db } from "../config/db";
import type { UserRegistration } from "../schemas/user.schema";
import argon2 from "argon2";

export const userService = {
  async createUser(data: UserRegistration) {
    return await db.user.create({ data: { ...data } });
  },
  async getUserByEmail(email: string) {
    return await db.user.findUnique({ where: { email } });
  },

  async hashPassword(password: string) {
    return await argon2.hash(password);
  },
  async verifyPassword(hashedPassword: string, password: string) {
    return await argon2.verify(hashedPassword, password);
  },
};
