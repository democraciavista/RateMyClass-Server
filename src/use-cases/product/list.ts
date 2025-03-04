import { Product } from '@prisma/client';

import { IProductRepository } from '@repositories/product-repository';

interface ListProductsUseCaseRequest {
  name?: string;
  maxPrice?: number;
  minPrice?: number;
  stock?: number;
}

interface ListProductsUseCaseResponse {
  products: Product[];
}

export class ListProductsUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private productRepository: IProductRepository) {}

  async execute({
    maxPrice,
    minPrice,
    name,
    stock,
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    const products = await this.productRepository.findAll({
      maxPrice,
      minPrice,
      name,
      stock,
    });

    return { products };
  }
}
