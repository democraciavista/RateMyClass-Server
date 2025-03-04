import { PrismaOrderItemRepository } from '@repositories/prisma/prisma-order-item-repository';

import { ListOrderItemsUseCase } from '@use-cases/order-item/list';

export function makeListOrderItemUseCase() {
  const orderItemRepository = new PrismaOrderItemRepository();
  const listOrderItemUseCase = new ListOrderItemsUseCase(orderItemRepository);

  return listOrderItemUseCase;
}
