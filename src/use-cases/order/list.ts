import { Order } from '@prisma/client';
import { OrderFilters } from '@repositories/order-repository';

import { IOrderRepository } from '@repositories/order-repository';

interface ListOrderUseCaseResponse {
  orders: Order[];
}

export class ListOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    consumerId,
    maxDate,
    maxPrice,
    minDate,
    minPrice,
    status,
  }: OrderFilters): Promise<ListOrderUseCaseResponse> {
    const orders = await this.orderRepository.findAll({
      consumerId,
      maxDate,
      maxPrice,
      minDate,
      minPrice,
      status,
    });

    return { orders };
  }
}
