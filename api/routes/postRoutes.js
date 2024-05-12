import { Router } from "express";
import { 
    submitPost, 
    deletePost, 
    editPost,
    getPosts,
    getSinglePost,
    getUserPosts
} from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

//Get all recipes; default limit 50; returns next_url as cursor
router.get('/', getPosts);

//Get specific recipe from url slug
router.get('/:slug', getSinglePost);

//Get posts from user
router.get('/user/:user', getUserPosts);

//Get posts by category (default sort alpabetical, optional sort by views or date created)
//query params for sort if exist
//router.get('/:category', getPosts);

router.post('/submit', protectRoute, submitPost);
router.delete('/:slug/delete/', protectRoute, deletePost);
router.put('/:slug/edit', protectRoute, editPost);

export { router };