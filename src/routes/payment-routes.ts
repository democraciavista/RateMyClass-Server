import { Router } from 'express';

import PaymentController from '@http/controllers/payment-controller';
import { verifyJwt } from '@http/middlewares/verify-jwt';

const paymentRouter = Router();

paymentRouter.use(verifyJwt);

paymentRouter.route('/:orderId').patch(PaymentController.pay);

export default paymentRouter;
