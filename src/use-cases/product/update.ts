import { Product } from '@prisma/client';

import { IProductRepository } from '@repositories/product-repository';

interface UpdateProductUseCaseRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

interface UpdateProductUseCaseResponse {
  product: Product;
}

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    data: UpdateProductUseCaseRequest,
  ): Promise<UpdateProductUseCaseResponse> {
    const product = await this.productRepository.save(data.id, data);

    return { product };
  }
}
