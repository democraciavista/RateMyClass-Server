import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';
import { RegisterOrderUseCase } from '@use-cases/order/register';

export function makeRegisterOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const registerOrderUseCase = new RegisterOrderUseCase(orderRepository);

  return registerOrderUseCase;
}
