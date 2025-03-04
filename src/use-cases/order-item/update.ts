import { OrderItem, Prisma } from '@prisma/client';

import { NotFoundError } from '@errors/not-found-error';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { IOrderRepository } from '@repositories/order-repository';
import { ForbiddenError } from '@errors/forbidden-error';

interface UpdateOrderItemUseCaseRequest {
  id: string;
  quantity?: number;
}

interface UpdateOrderItemUseCaseResponse {
  orderItem: OrderItem;
}

export class UpdateOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute({
    id,
    quantity,
  }: UpdateOrderItemUseCaseRequest): Promise<UpdateOrderItemUseCaseResponse> {
    const orderItem = await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new NotFoundError('Item de pedido não encontrado');
    }
    const order = await this.orderRepository.findById(orderItem.orderId);

    if (!order) {
      throw new NotFoundError('Pedido não encontrado');
    }

    if (order.status !== 'OPENED') {
      throw new ForbiddenError(
        'Não é possível alterar um item de pedido fechado',
      );
    }

    const subtotal = new Prisma.Decimal(
      Number(orderItem.unitPrice) * (quantity || orderItem.quantity),
    );

    const updatedOrderItem = await this.orderItemRepository.save(id, {
      quantity: quantity || orderItem.quantity,
      subtotal,
    });

    await this.orderRepository.save(updatedOrderItem.orderId, {
      total: {
        increment: Number(subtotal) - Number(orderItem.subtotal),
      },
    });

    return { orderItem: updatedOrderItem };
  }
}
