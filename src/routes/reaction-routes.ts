import reactionController from '@http/controllers/reaction-controller';
import { Router } from 'express';

const reactionRouter = Router();
reactionRouter.route('/').post(reactionController.register);
reactionRouter.route('/').get(reactionController.getAll);
reactionRouter.route('/:id').delete(reactionController.delete);
reactionRouter.route('/:id').patch(reactionController.update);
reactionRouter.route('/:id').get(reactionController.getById);

export default reactionRouter;
