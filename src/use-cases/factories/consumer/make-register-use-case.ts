import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { RegisterConsumerUseCase } from '@use-cases/consumer/register';

export function makeConsumerRegisterUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const registerUseCase = new RegisterConsumerUseCase(consumersRepository);

  return registerUseCase;
}
