import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { PrismaDisciplineRepository } from '@repositories/prisma/prisma-discipline-repository';
import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { RegisterMaterialUseCase } from '@use-cases/material/register';

export function makeRegisterMaterialUseCase() {
  const MaterialsRepository = new PrismaMaterialRepository();
  const UsersRepository = new PrismaUserRepository();
  const SubjectsRepository = new PrismaDisciplineRepository();
  const registerUseCase = new RegisterMaterialUseCase(
    MaterialsRepository,
    UsersRepository,
    SubjectsRepository,
  );
  return registerUseCase;
}
