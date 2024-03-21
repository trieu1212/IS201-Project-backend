import orderController from "../controllers/order.controller";
import middlewareController from "../controllers/middleware.controller";
import express from 'express';

const router = express.Router();
//user does
router.post('/create/:userId',middlewareController.verifyTokenAndAuthorize,orderController.createOrder)
router.get('/:userId',middlewareController.verifyTokenAndAuthorize,orderController.getAllUserOrder)
export default router;