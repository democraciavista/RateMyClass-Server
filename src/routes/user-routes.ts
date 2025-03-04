import { Router } from 'express';

import UserController from '@http/controllers/user-controller';
import { verifyPermission } from '@http/middlewares/verify-permission';

const userRouter = Router();

userRouter.route('/').post(UserController.register);
userRouter.route('/verify-email').post(UserController.verifyEmail);
userRouter.route('/sessions').post(UserController.authenticate);
userRouter.route('/:userId').delete([verifyPermission], UserController.delete);

export default userRouter;
