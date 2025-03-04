import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';
import { UpdateStatusOrderUseCase } from '@use-cases/order/update-status';

export function makeUpdateOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const updateStatusOrderUseCase = new UpdateStatusOrderUseCase(
    orderRepository,
  );

  return updateStatusOrderUseCase;
}
