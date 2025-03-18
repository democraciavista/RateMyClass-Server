import { Router, static as static_ } from 'express';
import UserRoutes from './user-routes';

const router = Router();

router.use('/user', UserRoutes);
router.route('/').get((_, res) => {
  res.send('Bem vindo a API do Rate My Class💙');
});

export default router;
