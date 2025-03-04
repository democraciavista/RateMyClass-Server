import { PrismaProductRepository } from '@repositories/prisma/prisma-product-repository';
import { ListProductsUseCase } from '@use-cases/product/list';

export function makeListProductUseCase() {
  const productsRepository = new PrismaProductRepository();
  const listProductUseCase = new ListProductsUseCase(productsRepository);

  return listProductUseCase;
}
