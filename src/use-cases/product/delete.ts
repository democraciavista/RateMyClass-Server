import { Product } from '@prisma/client';

import { IProductRepository } from '@repositories/product-repository';

interface DeleteUseCaseResponse {
  product: Product;
}

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    const product = await this.productRepository.delete(id);

    return { product };
  }
}
