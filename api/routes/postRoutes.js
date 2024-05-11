import { Router } from "express";
import { 
    submitPost, 
    deletePost, 
    editPost,
    getPosts,
    getSinglePost
} from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

//Get all recipes; default limit 50; returns next_url as cursor
router.get('/posts', getPosts);

//Get specific recipe from url slug
router.get('/post/:id', getSinglePost);

router.post('/submit', protectRoute, submitPost);
router.delete('/delete', deletePost);
router.put('/edit', editPost);

export { router };