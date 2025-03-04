import { PrismaOrderItemRepository } from '@repositories/prisma/prisma-order-item-repository';
import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';

import { UpdateOrderItemUseCase } from '@use-cases/order-item/update';

export function makeUpdateOrderItemUseCase() {
  const orderItemRepository = new PrismaOrderItemRepository();
  const orderRepository = new PrismaOrderRepository();
  const updateOrderItemUseCase = new UpdateOrderItemUseCase(
    orderItemRepository,
    orderRepository,
  );

  return updateOrderItemUseCase;
}
