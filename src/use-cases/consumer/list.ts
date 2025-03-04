import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

interface ListConsumerUseCaseResponse {
  consumers: Consumer[];
}

export class ListConsumerUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(): Promise<ListConsumerUseCaseResponse> {
    const consumers = await this.consumerRepository.findAll();

    return { consumers };
  }
}
