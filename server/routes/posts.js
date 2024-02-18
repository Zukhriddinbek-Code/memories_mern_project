import express from "express";

import { getPosts, createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

// /posts
router.get("/", getPosts);

router.post("/", createPost);

//update thing existing documents
router.patch("/:id", updatePost);

export default router;
