import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UnauthorizedError } from '@errors/unauthorized-error';

import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { jwtVerification } from '@utils/jwt-verification';

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError();
    }

    const [, token] = authHeader.split(' ');

    await jwtVerification(token);

    return next();
  } catch (error) {
    return next(error);
  }
}
