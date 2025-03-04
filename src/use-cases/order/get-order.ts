import { Order } from '@prisma/client';

import { IOrderRepository } from '@repositories/order-repository';
import { NotFoundError } from '@errors/not-found-error';

interface GetOrderUseCaseRequest {
  id: string;
}

interface GetOrderUseCaseResponse {
  order: Order;
}

export class GetOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    id,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundError('Pedido não encontrado');
    }

    return { order };
  }
}
