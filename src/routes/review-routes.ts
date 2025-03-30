import reviewController from '@http/controllers/review-controller';
import { Router } from 'express';

const reviewRouter = Router();
reviewRouter.route('/').post(reviewController.register);
reviewRouter.route('/').get(reviewController.getAll);
reviewRouter.route('/:id').delete(reviewController.delete);
reviewRouter.route('/:id').patch(reviewController.update);
reviewRouter.route('/:id').get(reviewController.getById);

export default reviewRouter;
