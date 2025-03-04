import { Prisma, Product } from '@prisma/client';

import prisma from '@database';

import { IProductRepository } from '@repositories/product-repository';

export interface ProductFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: number;
}

export class PrismaProductRepository implements IProductRepository {
  async findAll({
    name,
    maxPrice,
    minPrice,
    stock,
  }: ProductFilters): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        price: {
          lte: maxPrice,
          gte: minPrice,
        },
        stock: {
          gte: stock,
        },
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await prisma.product.create({
      data: data,
    });
  }

  async save(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return await prisma.product.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async delete(id: string): Promise<Product> {
    return await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
