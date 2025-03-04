import { ForbiddenError } from '@errors/forbidden-error';
import { OrderItem } from '@prisma/client';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { IOrderRepository } from '@repositories/order-repository';

interface DeleteOrderItemUseCaseRequest {
  id: string;
}

interface DeleteOrderItemUseCaseResponse {
  orderItem: OrderItem;
}

export class DeleteOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute({
    id,
  }: DeleteOrderItemUseCaseRequest): Promise<DeleteOrderItemUseCaseResponse> {
    const orderItem = await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new Error('Item de pedido não encontrado');
    }

    const order = await this.orderRepository.findById(orderItem.orderId);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    if (order.status !== 'OPENED') {
      throw new ForbiddenError(
        'Não é possível deletar um item de pedido fechado',
      );
    }

    await Promise.all([
      this.orderItemRepository.delete(id),

      this.orderRepository.save(orderItem.orderId, {
        total: {
          decrement: orderItem.subtotal,
        },
      }),
    ]);

    return { orderItem };
  }
}
