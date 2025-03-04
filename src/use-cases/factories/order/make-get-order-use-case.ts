import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';
import { GetOrderUseCase } from '@use-cases/order/get-order';

export function makeGetOrderUseCase() {
  const ordersRepository = new PrismaOrderRepository();
  const getOrderUseCase = new GetOrderUseCase(ordersRepository);

  return getOrderUseCase;
}
