import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

interface DeleteConsumerUseCaseResponse {
  consumer: Consumer;
}

export class DeleteConsumerUseCase {
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(id: string): Promise<DeleteConsumerUseCaseResponse> {
    const consumer = await this.consumerRepository.delete(id);

    return { consumer };
  }
}
