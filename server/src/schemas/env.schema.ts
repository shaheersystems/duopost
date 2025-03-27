import * as z from "zod";

export const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("dev"),
  DATABASE_URL: z.string().default(""),
  JWT_SECRET: z.string().default(""),
});
