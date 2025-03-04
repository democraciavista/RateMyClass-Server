import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { RegisterUseCase } from '@use-cases/user/register';

export function makeUserRegisterUseCase() {
  const usersRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
