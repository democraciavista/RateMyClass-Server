import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { ListConsumerUseCase } from '@use-cases/consumer/list';

export function makeListConsumerUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const listConsumerUseCase = new ListConsumerUseCase(consumersRepository);

  return listConsumerUseCase;
}
