import { NotFoundError } from '@errors/not-found-error';
import { Reaction, Prisma } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction;
}

export class UpdateReactionUseCase {
  constructor(private ReactionRepository: IReactionRepository) {}

  async execute(
    id: string,
    data: Prisma.ReactionUpdateInput,
  ): Promise<RegisterReactionUseCaseResponse> {
    const ReactionExist = await this.ReactionRepository.findById(id);
    if (!ReactionExist) {
      throw new NotFoundError('Reação não encontrada');
    }
    const Reaction = await this.ReactionRepository.update(id, data);
    return { Reaction };
  }
}
