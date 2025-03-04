import { Order } from '@prisma/client';

import { IOrderRepository } from '@repositories/order-repository';

import { AlreadyExistsError } from '@errors/already-exists-error';

interface RegisterOrderUseCaseRequest {
  consumerId: string;
}

interface RegisterOrderUseCaseResponse {
  order: Order;
}

export class RegisterOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    consumerId,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const alreadyExistsOpenOrder = await this.orderRepository.findAll({
      consumerId,
      status: 'OPENED',
    });

    if (alreadyExistsOpenOrder.length > 0) {
      throw new AlreadyExistsError(
        'Já existe um pedido em aberto para este cliente.',
      );
    }

    const order = await this.orderRepository.create({
      consumerId,
    });

    return { order };
  }
}
