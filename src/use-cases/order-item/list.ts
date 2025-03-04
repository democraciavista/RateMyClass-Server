import { OrderItem } from '@prisma/client';

import { IOrderItemRepository } from '@repositories/order-item-repository';

interface ListOrderItemsUseCaseRequest {
  orderId: string;
}

interface ListOrderItemsUseCaseResponse {
  orderItems: OrderItem[];
}

export class ListOrderItemsUseCase {
  constructor(private orderItemRepository: IOrderItemRepository) {}

  async execute({
    orderId,
  }: ListOrderItemsUseCaseRequest): Promise<ListOrderItemsUseCaseResponse> {
    const orderItems = await this.orderItemRepository.findByOrderId(orderId);

    return { orderItems };
  }
}
