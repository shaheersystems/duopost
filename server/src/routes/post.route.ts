import { Router } from "express";
import {
  createPost,
  retreivePosts,
  updatePost,
} from "../controllers/post.controller";
import { validate } from "../middlewares/validate";
import { createPostSchema } from "../schemas/post.schema";
import { type RequestHandler } from "express";
import { auth } from "../middlewares/auth";
const router = Router();

router.get("/posts", auth, retreivePosts);
router.post(
  "/posts",
  auth,
  validate(createPostSchema),
  createPost as unknown as RequestHandler
);

router.put(
  "/posts/:id",
  auth,
  validate(createPostSchema),
  updatePost as unknown as RequestHandler
);

export default router;
