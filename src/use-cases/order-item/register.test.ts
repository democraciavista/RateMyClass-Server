import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryOrderItemsRepository } from '@repositories/in-memory/in-memory-order-items-repository';
import { InMemoryOrderRepository } from '@repositories/in-memory/in-memory-order-repository';
import { InMemoryProductRepository } from '@repositories/in-memory/in-memory-product-repository';

import { RegisterOrderItemUseCase } from '@use-cases/order-item/register';

let orderItemRepository: InMemoryOrderItemsRepository;
let orderRepository: InMemoryOrderRepository;
let productRepository: InMemoryProductRepository;
let sut: RegisterOrderItemUseCase;

describe('Register Order Item Use Case', () => {
  beforeEach(() => {
    orderItemRepository = new InMemoryOrderItemsRepository();
    orderRepository = new InMemoryOrderRepository();
    productRepository = new InMemoryProductRepository();
    sut = new RegisterOrderItemUseCase(
      orderItemRepository,
      orderRepository,
      productRepository,
    );
  });

  it('should be able register a new order item', async () => {
    const order = await orderRepository.create({
      consumerId: 'consumer-id',
    });

    const product = await productRepository.create({
      name: 'Product',
      price: 10,
      description: 'Description',
      stock: 10,
    });

    const { orderItem } = await sut.execute({
      orderId: order.id,
      productId: product.id,
      quantity: 2,
    });

    expect(orderItem.id).toEqual(expect.any(String));
    expect(orderItem.orderId).toBe(order.id);
  });
});
