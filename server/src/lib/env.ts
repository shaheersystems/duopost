import { envSchema } from "../schemas/env.schema";

// validate env

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    console.log("Environment variables validated successfully.");
    return env;
  } catch (error) {
    console.error("Environment variable validation failed:", error);
    process.exit(1); // Exit the application if validation fails
  }
}

export function getEnv(key: string): string | number {
  return process.env[key]!;
}

// Call the function on startup
const env = validateEnv();
