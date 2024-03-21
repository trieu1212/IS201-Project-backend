import middlewareController from "../controllers/middleware.controller";
import postController from "../controllers/post.controller";
import express from "express";
const router = express.Router()
router.post('/create/:userId',middlewareController.verifyTokenAndAuthorize,postController.createPost)
export default router;