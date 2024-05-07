import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = Router();

router.get('/register', register);
router.get('/login', login);
router.get('/logout', logout);

export { router };