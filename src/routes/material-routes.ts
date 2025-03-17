import MaterialController from '@http/controllers/material-controller';
import { Router } from 'express';

const materialRouter = Router();
materialRouter.route('/').post(MaterialController.register);
materialRouter.route('/').get(MaterialController.getAllWithFilters);
materialRouter
  .route('/favorite/:id')
  .get(MaterialController.getFavoriteWithFilters);
materialRouter.route('/:id').delete(MaterialController.delete);
materialRouter.route('/:id').patch(MaterialController.update);
materialRouter.route('/:id').get(MaterialController.getById);

export default materialRouter;
