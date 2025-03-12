import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRegisterSchema } from '@DTOs/user/register';
import { VerifyEmailSchema } from '@DTOs/user/verify-email';
import { AuthenticateSchema } from '@DTOs/user/authenticate';
import { VerifyPasswordSchema } from '@DTOs/user/verify-password';
import {
  makeUserAuthenticateUseCase,
  makeUserDeleteUseCase,
  makeUserGetAll,
  makeUserGetByIdUseCase,
  makeUserRegisterUseCase,
  makeUserResetPasswordUseCase,
  makeUserUpdateUseCase,
  makeUserVerifyEmailUseCase,
  makeUserVerifyPasswordUseCase,
} from '@use-cases/factories/user';
import { UserUpdateSchema } from '@DTOs/user/update';

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

  async verifyPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, token, newPassword } = VerifyPasswordSchema.parse(
        req.body,
      );

      const verifyPasswordUseCase = makeUserVerifyPasswordUseCase();

      await verifyPasswordUseCase.execute({
        email,
        token,
        newPassword,
      });

      res.status(200).json({
        message: 'Senha alterada com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const resetPasswordUseCase = makeUserResetPasswordUseCase();

      await resetPasswordUseCase.execute({ email });

      res.status(200).json({
        message: 'E-mail de recuperação de senha enviado com sucesso!',
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

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllUseCase = makeUserGetAll();
      const users = await getAllUseCase.execute();
      res.status(200).json({
        data: users,
        message: 'Usuários encontrados com sucesso!',
      });
      return next();
    } catch (error) {
      return next;
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
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const getByIdUseCase = makeUserGetByIdUseCase();

      const { user } = await getByIdUseCase.execute(id);

      res.status(200).json({
        data: user,
        message: 'Usuário encontrado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = UserUpdateSchema.parse(req.body);

      const updateUseCase = makeUserUpdateUseCase();

      await updateUseCase.execute({ id, data });

      res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
