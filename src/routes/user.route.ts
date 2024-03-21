import express,{Request,Response} from 'express';
import userController from '../controllers/user.controller';
import middlewareController from '../controllers/middleware.controller';
const router:express.Router = express.Router();
//user does
router.get('/:userId',middlewareController.verifyTokenAndAuthorite,userController.getUser)
router.put('/update/:userId',middlewareController.verifyTokenAndAuthorite,userController.updateUser)
router.delete('/delete/:userId',middlewareController.verifyTokenAndAuthorite,userController.deleteUser)
export default router;