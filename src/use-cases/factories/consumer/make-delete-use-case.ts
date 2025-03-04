import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { DeleteConsumerUseCase } from '@use-cases/consumer/delete';

export function makeConsumerDeleteUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const deleteUseCase = new DeleteConsumerUseCase(consumersRepository);

  return deleteUseCase;
}
