import { Router } from "express";
import { submitPost, deletePost, editPost } from "../controllers/postController.js";

const router = Router();

router.post('/submit', submitPost);
router.delete('/delete', deletePost);
router.put('/edit', editPost);

export { router };