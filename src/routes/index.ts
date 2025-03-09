import { Router, static as static_ } from 'express';
import UserRoutes from './user-routes';

const router = Router();

router.use('/user', UserRoutes);
router.route('/').get((_, res) => {
  res.send('running in localhost:3001');
});

export default router;
