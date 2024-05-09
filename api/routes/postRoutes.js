import { Router } from "express";
import { submitPost, deletePost, editPost } from "../controllers/postController.js";

const router = Router();

//Get all recipes; default limit 50; returns next_url as cursor
router.get('/posts', getPosts);

//Get specific recipe from url slug
router.get('/post/:id');

router.post('/submit', submitPost);
router.delete('/delete', deletePost);
router.put('/edit', editPost);

export { router };