import { Router } from "express";
import submitPost from "../controllers/postController.js";

const router = Router();

router.get('/', submitPost);

export { router };