import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryOrderItemsRepository } from '@repositories/in-memory/in-memory-order-items-repository';
import { InMemoryOrderRepository } from '@repositories/in-memory/in-memory-order-repository';

import { ListOrderItemsUseCase } from '@use-cases/order-item/list';

let orderItemRepository: InMemoryOrderItemsRepository;
let orderRepository: InMemoryOrderRepository;
let sut: ListOrderItemsUseCase;

describe('List Order Item Use Case', () => {
  beforeEach(() => {
    orderItemRepository = new InMemoryOrderItemsRepository();
    orderRepository = new InMemoryOrderRepository();
    sut = new ListOrderItemsUseCase(orderItemRepository);
  });

  it('should be able list order items in one order', async () => {
    const order = await orderRepository.create({
      consumerId: 'consumer-id',
    });

    await Promise.all([
      orderItemRepository.create({
        orderId: order.id,
        productId: 'product-id',
        quantity: 2,
        unitPrice: 10.0,
        subtotal: 20.0,
      }),
      orderItemRepository.create({
        orderId: order.id,
        productId: 'product-id',
        quantity: 2,
        unitPrice: 10.0,
        subtotal: 20.0,
      }),
    ]);

    const { orderItems } = await sut.execute({
      orderId: order.id,
    });

    expect(orderItems.length).toEqual(2);
  });
});
