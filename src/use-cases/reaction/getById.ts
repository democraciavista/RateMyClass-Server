import { NotFoundError } from '@errors/not-found-error';
import { Reaction } from '@prisma/client';

interface GetByIdReactionUseCaseResponse {
  Reaction: Reaction;
}
import { IReactionRepository } from '@repositories/interface/reaction-repository';

export class GetByIdReactionUseCase {
  constructor(private ReactionRepository: IReactionRepository) {}

  async execute(id: string): Promise<GetByIdReactionUseCaseResponse> {
    try {
      const Reaction = await this.ReactionRepository.findById(id);
      if (!Reaction) {
        throw new NotFoundError('Reação não encontrada');
      }

      return { Reaction };
    } catch (error) {
      throw error;
    }
  }
}
