import * as z from "zod";

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
});
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
