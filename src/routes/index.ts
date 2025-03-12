import { Router, static as static_ } from 'express';
import UserRoutes from './user-routes';
import MaterialRouter from './material-routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/material', MaterialRouter);
router.route('/').get((_, res) => {
  res.send('Bem vindo a API do Rate My Class💙');
});

export default router;
