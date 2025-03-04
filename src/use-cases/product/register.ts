import { Product } from '@prisma/client';

import { IProductRepository } from '@repositories/product-repository';

interface RegisterProductUseCaseRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface RegisterProductUseCaseResponse {
  product: Product;
}

export class RegisterProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    data: RegisterProductUseCaseRequest,
  ): Promise<RegisterProductUseCaseResponse> {
    const product = await this.productRepository.create(data);

    return { product };
  }
}
