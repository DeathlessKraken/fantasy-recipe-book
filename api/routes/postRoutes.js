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

//Get all recipes; TODO [ ] default limit 25; returns next_url as cursor
//Default sort by title alphabetical
//Optional Search posts in db, allows "" for quoted text, and - symbol for negation
//Optional CATEGORY query (default - all, ...categories)
//Optional SORT query (default - alphabetical, popularity, date)
//Optional TIME query (default - all, year, month, week)
router.get('/', getPosts);

//Get specific recipe from url slug
router.get('/:slug', getSinglePost);

//Get posts from user
//Optional queries accepted
router.get('/user/:user', getUserPosts);

router.post('/submit', protectRoute, submitPost);
router.delete('/:slug/delete/', protectRoute, deletePost);
router.put('/:slug/edit', protectRoute, editPost);

export { router };