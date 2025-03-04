import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryProductRepository } from '@repositories/in-memory/in-memory-product-repository';

import { NotFoundError } from '@errors/not-found-error';

import { GetProductUseCase } from './get-product';

let productRepository: InMemoryProductRepository;
let sut: GetProductUseCase;

describe('GetProduct Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    sut = new GetProductUseCase(productRepository);
  });

  it('should get product a product', async () => {
    const response = await productRepository.create({
      name: 'Xbox Series X',
      price: 5000.0,
      stock: 10,
      description: 'The best console ever',
    });

    const { product } = await sut.execute({
      id: response.id,
    });

    expect(product.id).toEqual(expect.any(String));
    expect(product.name).toBe('Xbox Series X');
  });

  it('should not be able to get a product that does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-product-id',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
