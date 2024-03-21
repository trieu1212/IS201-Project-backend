import express,{Request,Response} from 'express';
import userController from '../controllers/user.controller';
import middlewareController from '../controllers/middleware.controller';
const router:express.Router = express.Router();
//user does
router.get('/:userId',middlewareController.verifyTokenAndAuthorize,userController.getUser)
router.put('/update/:userId',middlewareController.verifyTokenAndAuthorize,userController.updateUser)
router.delete('/delete/:userId',middlewareController.verifyTokenAndAuthorize,userController.deleteUser)
export default router;