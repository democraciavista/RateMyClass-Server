import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryProductRepository } from '@repositories/in-memory/in-memory-product-repository';

import { RegisterProductUseCase } from './register';

let productRepository: InMemoryProductRepository;
let sut: RegisterProductUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    sut = new RegisterProductUseCase(productRepository);
  });

  it('should register a new product', async () => {
    const { product } = await sut.execute({
      name: 'Xbox Series X',
      price: 5000.0,
      stock: 10,
      description: 'The best console ever',
    });

    expect(product.id).toEqual(expect.any(String));
    expect(product.name).toBe('Xbox Series X');
  });
});
