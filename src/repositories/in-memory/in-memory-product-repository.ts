import { Prisma, Product } from '@prisma/client';

import { randomUUID } from 'node:crypto';

import { IProductRepository } from '@repositories/product-repository';
import { ProductFilters } from '@repositories/prisma/prisma-product-repository';

export class InMemoryProductRepository implements IProductRepository {
  public items: Product[] = [];

  async findAll({
    name,
    maxPrice,
    minPrice,
    stock,
  }: ProductFilters): Promise<Product[]> {
    return this.items.filter((item) => {
      if (name && !item.name.includes(name)) {
        return false;
      }

      if (maxPrice && item.price > new Prisma.Decimal(String(maxPrice))) {
        return false;
      }

      if (minPrice && item.price < new Prisma.Decimal(String(minPrice))) {
        return false;
      }

      if (stock && item.stock < stock) {
        return false;
      }

      return true;
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = {
      id: randomUUID() as string,
      description: data.description,
      name: data.name,
      price: new Prisma.Decimal(String(data.price)),
      stock: data.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(product);

    return product;
  }

  async save(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    const productIndex = this.items.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const product = this.items[productIndex];

    const updatedProduct = {
      id: product.id,
      description:
        (data.description as string | undefined) || product.description,
      name: (data.name as string | undefined) || product.name,
      price: new Prisma.Decimal(String(data.price || product.price)),
      stock: (data.stock as number | undefined) || product.stock,
      createdAt: product.createdAt,
      updatedAt: new Date(),
    };

    this.items[productIndex] = updatedProduct;

    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const productIndex = this.items.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const product = this.items[productIndex];

    this.items.splice(productIndex, 1);

    return product;
  }
}
