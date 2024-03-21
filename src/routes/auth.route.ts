import express,{Request,Response} from 'express';
import authController from '../controllers/auth.controller';
import middlewareController from '../controllers/middleware.controller';
const router:express.Router = express.Router();

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/refresh',middlewareController.verifyToken,authController.refresh)
router.post('/logout',middlewareController.verifyToken,authController.logout)
export default router;