import { Request, Response, NextFunction } from 'express';

import { ForbiddenError } from '@errors/forbidden-error';

import { jwtVerification } from '@utils/jwt-verification';

import { UnauthorizedError } from '@errors/unauthorized-error';

export async function verifyPermission(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.params;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError();
    }

    const [, token] = authHeader.split(' ');

    const { sub, role } = await jwtVerification(token);

    if (role !== 'ADMIN') {
      if (!userId) {
        throw new ForbiddenError(
          'Usuário não tem permissão para acessar este recurso.',
        );
      }

      if (userId && sub !== userId) {
        throw new ForbiddenError(
          'Usuário não tem permissão para acessar este recurso.',
        );
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
