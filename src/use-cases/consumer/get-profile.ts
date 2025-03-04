import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

import { NotFoundError } from '@errors/not-found-error';

interface GetProfileConsumerUseCaseResponse {
  consumer: Consumer;
}

export class GetProfileConsumerUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(id: string): Promise<GetProfileConsumerUseCaseResponse> {
    const consumer = await this.consumerRepository.findById(id);

    if (!consumer) {
      throw new NotFoundError('Cliente não encontrado');
    }

    return { consumer };
  }
}
