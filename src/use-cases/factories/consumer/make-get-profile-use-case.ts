import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { GetProfileConsumerUseCase } from '@use-cases/consumer/get-profile';

export function makeConsumerGetProfileUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const getConsumerProfileUseCase = new GetProfileConsumerUseCase(
    consumersRepository,
  );

  return getConsumerProfileUseCase;
}
