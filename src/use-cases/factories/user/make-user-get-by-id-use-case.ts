import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { GetByIdUseCase } from '@use-cases/user/getById';

function makeUserGetByIdUseCase() {
  const usersRepository = new PrismaUserRepository();
  const getByIdUseCase = new GetByIdUseCase(usersRepository);
  return getByIdUseCase;
}

export { makeUserGetByIdUseCase };
