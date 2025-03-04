import { Router, static as static_ } from 'express';
import UserRoutes from './user-routes';
import ConsumerRoutes from './consumer-routes';
import ProductRoutes from './product-routes';
import OrderRoutes from './order-routes';
import OrderItemRoutes from './order-items-routes';
import PaymentRoutes from './payment-routes';
import SalesReportRoutes from './sales-report-routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/consumer', ConsumerRoutes);
router.use('/product', ProductRoutes);
router.use('/order', OrderRoutes);
router.use('/order-item', OrderItemRoutes);
router.use('/payment', PaymentRoutes);
router.use('/sales-report', SalesReportRoutes);
router.route('/').get((_, res) => {
  res.send('Made by damattag 🚀 (https://github.com/damattag)');
});

export default router;
