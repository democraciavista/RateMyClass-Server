import jwt, { type JwtPayload } from 'jsonwebtoken';

import { UnauthorizedError } from '@errors/unauthorized-error';

import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';

export async function jwtVerification(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { sub, role } = decoded as JwtPayload;

  if (!sub || !role) {
    throw new UnauthorizedError();
  }

  const userRepository = new PrismaUserRepository();

  const user = await userRepository.findById(sub);

  if (!user || user.role !== role || user.id !== sub) {
    throw new UnauthorizedError();
  }

  if (!user.emailVerified) {
    throw new UnauthorizedError('E-mail não verificado');
  }

  return {
    sub,
    role,
  };
}
