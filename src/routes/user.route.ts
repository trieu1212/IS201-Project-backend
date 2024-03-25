import express,{Request,Response} from 'express';
import userController from '../controllers/user.controller';
import middlewareController from '../controllers/middleware.controller';
const router:express.Router = express.Router();
//user does
router.get('/get/:userId',middlewareController.verifyTokenAndAuthorize,userController.getUser)
router.put('/update-user/:userId',middlewareController.verifyTokenAndAuthorize,userController.updateUser)
router.delete('/delete-user/:userId',middlewareController.verifyTokenAndAuthorize,userController.deleteUser)

//admin does
router.get('/',middlewareController.verifyTokenAndAdmin,userController.getAllUser)
router.get('/:userId',middlewareController.verifyTokenAndAdmin,userController.getOneUser)
router.put('/update/:userId',middlewareController.verifyTokenAndAdmin,userController.updatUserByAdmin)
router.delete('/delete/:userId',middlewareController.verifyTokenAndAdmin,userController.deleteUserByAdmin)

export default router;