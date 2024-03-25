import middlewareController from "../controllers/middleware.controller";
import postController from "../controllers/post.controller";
import express from "express";
const router = express.Router()
router.post('/create/:userId',middlewareController.verifyTokenAndAuthorize,postController.createPost)

//all user does
router.get('/',postController.getAllPost)
router.get('/:postId',postController.getOnePost)
export default router;