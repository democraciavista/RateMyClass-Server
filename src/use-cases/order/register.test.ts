import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryOrderRepository } from '@repositories/in-memory/in-memory-order-repository';

import { RegisterOrderUseCase } from '@use-cases/order/register';

import { AlreadyExistsError } from '@errors/already-exists-error';

let orderRepository: InMemoryOrderRepository;
let sut: RegisterOrderUseCase;

describe('Register Order Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    sut = new RegisterOrderUseCase(orderRepository);
  });

  it('should be able register a new order', async () => {
    const { order } = await sut.execute({
      consumerId: 'consumer-id',
    });

    expect(order.id).toEqual(expect.any(String));
  });

  it('should not be able register a new order with an already opened order for the consumer', async () => {
    await sut.execute({
      consumerId: 'consumer-id',
    });

    await expect(
      sut.execute({
        consumerId: 'consumer-id',
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
