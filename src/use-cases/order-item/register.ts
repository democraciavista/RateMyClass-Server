import { OrderItem } from '@prisma/client';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { IOrderRepository } from '@repositories/order-repository';
import { IProductRepository } from '@repositories/product-repository';

import { ForbiddenError } from '@errors/forbidden-error';
import { NotFoundError } from '@errors/not-found-error';

interface RegisterOrderItemUseCaseRequest {
  orderId: string;
  productId: string;
  quantity: number;
}

interface RegisterOrderItemUseCaseResponse {
  orderItem: OrderItem;
}

export class RegisterOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {}

  async execute(
    data: RegisterOrderItemUseCaseRequest,
  ): Promise<RegisterOrderItemUseCaseResponse> {
    const order = await this.orderRepository.findById(data.orderId);

    if (!order) {
      throw new NotFoundError('Pedido não encontrado');
    }

    if (order.status !== 'OPENED') {
      throw new ForbiddenError(
        'Não é possível adicionar um item a um pedido fechado',
      );
    }

    const product = await this.productRepository.findById(data.productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    if (product.stock < data.quantity) {
      throw new ForbiddenError('Estoque insuficiente');
    }

    const subtotal = Number(product.price) * data.quantity;

    const orderItem = await this.orderItemRepository.create({
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      unitPrice: product.price,
      subtotal,
    });

    await this.orderRepository.save(data.orderId, {
      total: {
        increment: subtotal,
      },
    });

    return { orderItem };
  }
}
