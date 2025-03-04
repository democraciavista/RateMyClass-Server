import { Product } from '@prisma/client';

import { NotFoundError } from '@errors/not-found-error';

import { IProductRepository } from '@repositories/product-repository';
import { IOrderRepository } from '@repositories/order-repository';

interface SaleUpdateProductUseCaseRequest {
  orderId: string;
}

interface SaleUpdateProductUseCaseResponse {
  products: Product[];
}

export class SaleUpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute({ orderId }: SaleUpdateProductUseCaseRequest) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundError('Produto não encontrado');
    }

    const items = order.OrderItem?.map((item) => item);

    const products = items?.map(async (item) => {
      const product = await this.productRepository.findById(item.productId);

      if (!product) {
        throw new NotFoundError('Produto não encontrado');
      }

      return await this.productRepository.save(product.id, {
        stock: {
          decrement: item.quantity,
        },
      });
    });

    return { products };
  }
}
