import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';
import { PrismaProductRepository } from '@repositories/prisma/prisma-product-repository';
import { SaleUpdateProductUseCase } from '@use-cases/product/sale-update';

export function makeSaleProductUpdateUseCase() {
  const productsRepository = new PrismaProductRepository();
  const orderRepository = new PrismaOrderRepository();
  const updateProductUseCase = new SaleUpdateProductUseCase(
    productsRepository,
    orderRepository,
  );

  return updateProductUseCase;
}
