import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

interface SearchByNameConsumerUseCaseRequest {
  name: string;
}

interface SearchByNameConsumerUseCaseResponse {
  consumers: Consumer[];
}

export class SearchByNameConsumerUseCase {
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute({
    name,
  }: SearchByNameConsumerUseCaseRequest): Promise<SearchByNameConsumerUseCaseResponse> {
    const consumers = await this.consumerRepository.findAll(name);

    return { consumers };
  }
}
