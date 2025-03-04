import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { UpdateConsumerUseCase } from '@use-cases/consumer/update';

export function makeConsumerUpdateUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const updateConsumerUseCase = new UpdateConsumerUseCase(consumersRepository);

  return updateConsumerUseCase;
}
