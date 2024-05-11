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
router.get('/', getPosts);

//Get specific recipe from url slug
router.get('/:slug', getSinglePost);

router.post('/submit', protectRoute, submitPost);
router.delete('/delete', protectRoute, deletePost);
router.put('/edit', protectRoute, editPost);

export { router };