import { Router, static as static_ } from 'express';
import UserRoutes from './user-routes';
import MaterialRouter from './material-routes';
import ReactionRouter from './reaction-routes';
import DisciplineRouter from './disciplina-routes';
import ReviewRouter from './review-routes';
import StatisticRouter from './statistic-routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/material', MaterialRouter);
router.use('/reaction', ReactionRouter);
router.use('/discipline', DisciplineRouter);
router.use('/review', ReviewRouter);
router.use('/statistic', StatisticRouter);

router.route('/').get((_, res) => {
  res.send('Bem vindo a API do Rate My Class💙');
});

export default router;
