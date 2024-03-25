import middlewareController from "../controllers/middleware.controller";
import postController from "../controllers/post.controller";
import express from "express";
const router = express.Router()
router.delete('/delete/:postId/:userId',middlewareController.verifyTokenAndAdmin,postController.deletePost)
//user does
router.post('/create-post/:userId',middlewareController.verifyTokenAndAuthorize,postController.createPost)
router.delete('/delete-post/:postId/:userId',middlewareController.verifyTokenAndAuthorize,postController.deletePost)
router.put('/update-post/:postId/:userId',middlewareController.verifyTokenAndAuthorize,postController.updatePost)
//all user does
router.get('/',postController.getAllPost)
router.get('/:postId',postController.getOnePost)
export default router;