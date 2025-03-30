import { Reaction } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction[];
}

export class GetAllReactionUseCase {
  constructor(private ReactionRepository: IReactionRepository) {}

  async execute(): Promise<RegisterReactionUseCaseResponse> {
    const Reaction = await this.ReactionRepository.findAll();
    return { Reaction };
  }
}
