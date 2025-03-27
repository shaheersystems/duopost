import { login, register } from "../controllers/user.controller";
import { Router } from "express";
import { validate } from "../middlewares/validate";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/user.schema";

const router = Router();

router.post("/register", validate(userRegistrationSchema), register);
router.post("/login", validate(userLoginSchema), login);

export default router;
