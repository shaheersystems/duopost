import { Router } from "express";
import { createPost, retreivePosts } from "../controllers/post.controller";
import { validate } from "../middlewares/validate";
import { createPostSchema } from "../schemas/post.schema";
import { type RequestHandler } from "express";
const router = Router();

router.get("/posts", retreivePosts);
router.post(
  "/posts",
  validate(createPostSchema),
  createPost as unknown as RequestHandler
);

export default router;
