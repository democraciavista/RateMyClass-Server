import { PrismaProductRepository } from '@repositories/prisma/prisma-product-repository';
import { RegisterProductUseCase } from '@use-cases/product/register';

export function makeProductRegisterUseCase() {
  const productsRepository = new PrismaProductRepository();
  const registerUseCase = new RegisterProductUseCase(productsRepository);

  return registerUseCase;
}
