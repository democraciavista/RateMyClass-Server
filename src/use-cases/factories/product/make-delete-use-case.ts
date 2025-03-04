import { PrismaProductRepository } from '@repositories/prisma/prisma-product-repository';
import { DeleteProductUseCase } from '@use-cases/product/delete';

export function makeProductDeleteUseCase() {
  const productsRepository = new PrismaProductRepository();
  const deleteUseCase = new DeleteProductUseCase(productsRepository);

  return deleteUseCase;
}
