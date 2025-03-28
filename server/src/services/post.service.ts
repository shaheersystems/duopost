import { db } from "../config/db";
import { type CreatePost } from "../schemas/post.schema";

type CreatePostInput = CreatePost & {
  userId: string;
};
export const postService = {
  async getPosts() {
    return await db.post.findMany();
  },
  async getUserPosts(userId: string) {
    return await db.post.findMany({
      where: {
        authorId: userId,
      },
    });
  },

  async createPost(data: CreatePostInput) {
    // Implement the logic for creating a post here
    return await db.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.userId,
      },
    });
  },

  async updatePost(id: string, data: CreatePostInput) {
    // Implement the logic for updating a post here
    return await db.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  },

  async deletePost(id: string) {
    // Implement the logic for deleting a post here
    return await db.post.delete({
      where: {
        id,
      },
    });
  },
};
