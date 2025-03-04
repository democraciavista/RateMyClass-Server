import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';
import { ListOrdersUseCase } from '@use-cases/order/list';

export function makeListOrdersUseCase() {
  const ordersRepository = new PrismaOrderRepository();
  const listOrdersUseCase = new ListOrdersUseCase(ordersRepository);

  return listOrdersUseCase;
}
