import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryOrderRepository } from '@repositories/in-memory/in-memory-order-repository';

import { GetOrderUseCase } from '@use-cases/order/get-order';

let orderRepository: InMemoryOrderRepository;
let sut: GetOrderUseCase;

describe('Get Order Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    sut = new GetOrderUseCase(orderRepository);
  });

  it('should be able get a order', async () => {
    const [orderResponse] = await Promise.all([
      orderRepository.create({
        consumerId: 'consumer-id1',
      }),
    ]);

    const { order } = await sut.execute({ id: orderResponse.id });

    expect(order.id).toEqual(orderResponse.id);
    expect(order.consumerId).toEqual('consumer-id1');
  });
});
