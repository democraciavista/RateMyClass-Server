import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { SearchByNameConsumerUseCase } from '@use-cases/consumer/search-by-name';

export function makeSearchConsumerByNameUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const searchConsumerByNameUseCase = new SearchByNameConsumerUseCase(
    consumersRepository,
  );

  return searchConsumerByNameUseCase;
}
