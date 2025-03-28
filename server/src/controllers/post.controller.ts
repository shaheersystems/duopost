import { tryCatch } from "../lib/try-catch";
import { postService } from "../services/post.service";
import { type Response } from "express";
import type { AuthRequest } from "../types/common";

export const createPost = async (req: Request, res: Response) => {
  const { user, body } = req as unknown as AuthRequest;

  const { data, error } = await tryCatch(
    (async () => {
      const data = await postService.createPost({
        ...body,
        userId: user.id,
      });
      return data;
    })()
  );
  if (error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }
  res
    .status(201)
    .json({ success: true, data, message: "Post created successfully!" });
  return;
};

export const retreivePosts = async (req: any, res: any) => {
  const { data, error } = await tryCatch(
    (async () => {
      const data = await postService.getPosts();
      return data;
    })()
  );
  if (error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }
  res.status(200).json({ success: true, data });
  return;
};

export const updatePost = async (req: Request, res: Response) => {
  const { user, body, params } = req as unknown as AuthRequest & {
    params: { id: string };
  };
  const { id } = params;
  const { data, error } = await tryCatch(
    (async () => {
      return await postService.updatePost(id, { ...body, authorId: user.id });
    })()
  );
  if (error) {
    res.json({
      success: false,
      message: error.message,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Post updated successfully!",
    data,
  });
  return;
};
