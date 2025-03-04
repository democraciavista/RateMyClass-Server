import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryOrderRepository } from '@repositories/in-memory/in-memory-order-repository';

import { ListOrdersUseCase } from '@use-cases/order/list';

let orderRepository: InMemoryOrderRepository;
let sut: ListOrdersUseCase;

describe('List Orders Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    sut = new ListOrdersUseCase(orderRepository);
  });

  it('should be able list a new order', async () => {
    await Promise.all([
      orderRepository.create({
        consumerId: 'consumer-id1',
      }),
      orderRepository.create({
        consumerId: 'consumer-id2',
      }),
    ]);

    const { orders } = await sut.execute({});

    expect(orders.length).toEqual(2);
  });
});
