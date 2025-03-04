import { PrismaProductRepository } from '@repositories/prisma/prisma-product-repository';
import { UpdateProductUseCase } from '@use-cases/product/update';

export function makeProductUpdateUseCase() {
  const productsRepository = new PrismaProductRepository();
  const updateProductUseCase = new UpdateProductUseCase(productsRepository);

  return updateProductUseCase;
}
