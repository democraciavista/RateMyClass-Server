import { Router } from 'express';

import ConsumerController from '@http/controllers/consumer-controller';

import { verifyJwt } from '@http/middlewares/verify-jwt';
import { verifyPermission } from '@http/middlewares/verify-permission';

const consumerRouter = Router();

consumerRouter
  .route('/')
  .post([verifyJwt], ConsumerController.register)
  .get([verifyJwt], ConsumerController.list);
consumerRouter
  .route('/search')
  .get([verifyPermission], ConsumerController.searchByName);
consumerRouter
  .route('/id/:consumerId')
  .delete([verifyPermission], ConsumerController.delete)
  .get([verifyPermission], ConsumerController.getProfile)
  .patch([verifyPermission], ConsumerController.save);

export default consumerRouter;
