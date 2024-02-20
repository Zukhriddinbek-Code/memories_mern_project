import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

// /posts
router.get("/", getPosts);

router.post("/", createPost);

//update thing existing documents
router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
