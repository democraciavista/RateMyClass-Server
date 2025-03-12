import { Router } from 'express';

import UserController from '@http/controllers/user-controller';
import { verifyPermission } from '@http/middlewares/verify-permission';

const userRouter = Router();

userRouter.route('/').post(UserController.register);
userRouter.route('/').get(UserController.getAll);
userRouter.route('/verify-email').post(UserController.verifyEmail);
userRouter.route('/verify-password').post(UserController.verifyPassword);
userRouter.route('/reset-password/:email').get(UserController.resetPassword);
userRouter.route('/sessions').post(UserController.authenticate);
userRouter.route('/:userId').delete([verifyPermission], UserController.delete);
userRouter.route('/:userId').get([verifyPermission], UserController.getById);
userRouter.route('/:userId').patch([verifyPermission], UserController.update);

export default userRouter;
