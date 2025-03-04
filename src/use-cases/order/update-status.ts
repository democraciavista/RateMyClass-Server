import { $Enums, Order } from '@prisma/client';

import { IOrderRepository } from '@repositories/order-repository';

import { NotFoundError } from '@errors/not-found-error';
import { ForbiddenError } from '@errors/forbidden-error';

interface UpdateStatusOrderUseCaseRequest {
  id: string;
  status: $Enums.OrderStatus;
  paymentDenied?: boolean;
}

interface UpdateStatusOrderUseCaseResponse {
  order: Order;
}

export class UpdateStatusOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    data: UpdateStatusOrderUseCaseRequest,
  ): Promise<UpdateStatusOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(data.id);

    if (data.paymentDenied) {
      throw new ForbiddenError(
        'O pagamento foi negado, entre em contato com o seu banco',
      );
    }

    if (!order) {
      throw new NotFoundError('Pedido não encontrado.');
    }

    if (order.status !== 'OPENED' && data.status === 'OPENED') {
      throw new ForbiddenError('Não é possível abrir um pedido fechado');
    }

    const updatedOrder = await this.orderRepository.save(data.id, {
      status: data.status,
      closedAt: new Date(),
    });

    return { order: updatedOrder };
  }
}
