import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.json("Test user route.");
});

export { router };