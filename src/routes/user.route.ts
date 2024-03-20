import express,{Request,Response} from 'express';
import userController from '../controllers/user.controller';
const router:express.Router = express.Router();

router.get('/',userController.getAllUser)
export default router;