import express,{Request,Response} from 'express';
import authController from '../controllers/auth.controller';
const router:express.Router = express.Router();

router.post('/register',authController.register)
router.post('/login',authController.login)
export default router;