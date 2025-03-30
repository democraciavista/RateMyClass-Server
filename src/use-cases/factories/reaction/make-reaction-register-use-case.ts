import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { PrismaReactionRepository } from '@repositories/prisma/prisma-reaction-repository';
import { RegisterReactionUseCase } from '@use-cases/reaction/register';

export function makeRegisterReactionUseCase() {
  const ReactionsRepository = new PrismaReactionRepository();
  const MaterialRepository = new PrismaMaterialRepository();
  const registerUseCase = new RegisterReactionUseCase(
    ReactionsRepository,
    MaterialRepository,
  );
  return registerUseCase;
}
