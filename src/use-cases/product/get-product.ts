import { Product } from '@prisma/client';

import { IProductRepository } from '@repositories/product-repository';
import { NotFoundError } from '@errors/not-found-error';

interface GetProductUseCaseRequest {
  id: string;
}

interface GetProductUseCaseResponse {
  product: Product;
}

export class GetProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    id,
  }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    return { product };
  }
}
