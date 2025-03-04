import { Router } from 'express';

import ProductController from '@http/controllers/product-controller';
import { verifyJwt } from '@http/middlewares/verify-jwt';
import { verifyPermission } from '@http/middlewares/verify-permission';

const productRouter = Router();

productRouter
  .route('/')
  .post([verifyPermission], ProductController.register)
  .get([verifyJwt], ProductController.list);
productRouter
  .route('/:productId')
  .delete([verifyPermission], ProductController.delete)
  .get([verifyJwt], ProductController.getProduct)
  .patch([verifyPermission], ProductController.save);

export default productRouter;
