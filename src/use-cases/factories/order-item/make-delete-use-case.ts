import { PrismaOrderItemRepository } from '@repositories/prisma/prisma-order-item-repository';
import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';

import { DeleteOrderItemUseCase } from '@use-cases/order-item/delete';

export function makeDeleteOrderItemUseCase() {
  const orderItemRepository = new PrismaOrderItemRepository();
  const orderRepository = new PrismaOrderRepository();
  const deleteOrderItemUseCase = new DeleteOrderItemUseCase(
    orderItemRepository,
    orderRepository,
  );

  return deleteOrderItemUseCase;
}
