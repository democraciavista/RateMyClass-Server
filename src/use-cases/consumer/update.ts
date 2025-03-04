import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

interface UpdateConsumerUseCaseRequest {
  id: string;
  fullName?: string;
  contact?: string;
  address?: string;
  status?: boolean;
}

interface UpdateConsumerUseCaseResponse {
  consumer: Consumer;
}

export class UpdateConsumerUseCase {
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(
    data: UpdateConsumerUseCaseRequest,
  ): Promise<UpdateConsumerUseCaseResponse> {
    const consumer = await this.consumerRepository.save(data.id, data);

    return { consumer };
  }
}
