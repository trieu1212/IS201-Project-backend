import express from 'express';
import serviceController from '../controllers/service.controller';
import middlewareController from '../controllers/middleware.controller';
const router = express.Router();
//admin does
router.post('/create/:userId',middlewareController.verifyTokenAndAdmin,serviceController.createService)
router.put('/update/:id/:userId',middlewareController.verifyTokenAndAdmin,serviceController.updateService)
router.delete('/delete/:id/:userId',middlewareController.verifyTokenAndAdmin,serviceController.deleteService)
//all user does
router.get('/',serviceController.getAllService)
export default router;