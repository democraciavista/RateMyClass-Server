import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { AuthenticateUseCase } from '@use-cases/user/authenticate';

export function makeUserAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
