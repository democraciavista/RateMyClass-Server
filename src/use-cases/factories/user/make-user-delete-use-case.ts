import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { DeleteUseCase } from '@use-cases/user/delete';

export function makeUserDeleteUseCase() {
  const usersRepository = new PrismaUserRepository();
  const deleteUseCase = new DeleteUseCase(usersRepository);

  return deleteUseCase;
}
