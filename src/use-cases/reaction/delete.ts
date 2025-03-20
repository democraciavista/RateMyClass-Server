import { NotFoundError } from '@errors/not-found-error';
import { Reaction } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction;
}

export class DeleteReactionUseCase {
  constructor(private ReactionRepository: IReactionRepository) {}

  async execute(id: string): Promise<RegisterReactionUseCaseResponse> {
    try {
      const ReactionExist = await this.ReactionRepository.findById(id);
      if (!ReactionExist) {
        throw new NotFoundError('Reação não encontrada');
      }
      const Reaction = await this.ReactionRepository.delete(id);

      return { Reaction };
    } catch (error) {
      throw error;
    }
  }
}
