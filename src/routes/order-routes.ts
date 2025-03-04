import { Router } from 'express';

import OrderController from '@http/controllers/order-controller';

import { verifyJwt } from '@http/middlewares/verify-jwt';

const orderRouter = Router();

orderRouter.use(verifyJwt);

orderRouter.route('/').post(OrderController.register).get(OrderController.list);

orderRouter
  .route('/:orderId')
  .get(OrderController.getOrder)
  .patch(OrderController.save);

export default orderRouter;
