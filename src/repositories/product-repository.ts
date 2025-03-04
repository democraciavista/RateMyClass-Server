import { Prisma, Product } from '@prisma/client';

import { ProductFilters } from '@repositories/prisma/prisma-product-repository';

export interface IProductRepository {
  findAll: (filters: ProductFilters) => Promise<Product[]>;
  findById: (id: string) => Promise<Product | null>;
  create: (data: Prisma.ProductCreateInput) => Promise<Product>;
  save: (id: string, data: Prisma.ProductUpdateInput) => Promise<Product>;
  delete: (id: string) => Promise<Product>;
}
