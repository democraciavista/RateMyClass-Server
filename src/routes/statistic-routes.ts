import statisticController from '@http/controllers/statistic-controller';
import { Router } from 'express';

const statisticRouter = Router();
statisticRouter.route('/').get(statisticController.getAll);
statisticRouter.route('/:id').get(statisticController.getById);
statisticRouter.route('/discipline/:id').get(statisticController.getByDiscipline);

export default statisticRouter;
