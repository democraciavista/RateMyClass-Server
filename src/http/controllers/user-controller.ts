import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserRegisterSchema } from '@DTOs/user/register';
import { VerifyEmailSchema } from '@DTOs/user/verify-email';
import { AuthenticateSchema } from '@DTOs/user/authenticate';

import { makeUserVerifyEmailUseCase } from '@use-cases/factories/user/make-user-verify-email-use-case';
import { makeUserRegisterUseCase } from '@use-cases/factories/user/make-user-register-use-case';
import { makeUserDeleteUseCase } from '@use-cases/factories/user/make-delete-use-case';
import { makeUserAuthenticateUseCase } from '@use-cases/factories/user/make-authenticate-use-case';
import { verifyPermission } from '@http/middlewares/verify-permission';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserRegisterSchema.parse(req.body);

      const registerUseCase = makeUserRegisterUseCase();

      await registerUseCase.execute(data);

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, token } = VerifyEmailSchema.parse(req.body);

      const verifyEmailUseCase = makeUserVerifyEmailUseCase();

      await verifyEmailUseCase.execute({
        email,
        token,
      });

      res.status(200).json({
        message: 'E-mail verificado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const deleteUseCase = makeUserDeleteUseCase();

      await deleteUseCase.execute(userId);

      res.status(200).json({
        message: 'Usuário deletado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = AuthenticateSchema.parse(req.body);

      const authenticateUseCase = makeUserAuthenticateUseCase();

      const { user } = await authenticateUseCase.execute(data);

      const accessToken = jwt.sign(
        {
          sub: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );

      const {
        password,
        emailTokenExpiry,
        emailVerificationToken,
        emailVerified,
        createdAt,
        updatedAt,
        ...userWithoutPassword
      } = user;

      res.status(200).json({
        data: {
          user: userWithoutPassword,
          accessToken,
        },
        message: 'Usuário autenticado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
