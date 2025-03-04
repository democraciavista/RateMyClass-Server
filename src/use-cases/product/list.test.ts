import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryProductRepository } from '@repositories/in-memory/in-memory-product-repository';

import { ListProductsUseCase } from './list';

let productRepository: InMemoryProductRepository;
let sut: ListProductsUseCase;

describe('ListProduct Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    sut = new ListProductsUseCase(productRepository);
  });

  it('should be able list products', async () => {
    await Promise.all([
      productRepository.create({
        name: 'Xbox Series X',
        price: 5000.0,
        stock: 10,
        description: 'The best console ever',
      }),
      productRepository.create({
        name: 'Playstation 5',
        price: 5000.0,
        stock: 10,
        description: 'The best console ever',
      }),
    ]);

    const { products } = await sut.execute({});

    expect(products.length).toEqual(2);
  });
});
