import { AlreadyExistsError } from '@errors/already-exists-error';
import { NotFoundError } from '@errors/not-found-error';
import { Reaction, Prisma, $Enums } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction;
}

export class UpdateReactionUseCase {
  constructor(private ReactionRepository: IReactionRepository) {}

  async execute(
    id: string,
    data: Prisma.ReactionUncheckedUpdateInput,
  ): Promise<RegisterReactionUseCaseResponse> {
    const reactionExist = await this.ReactionRepository.findById(id);
    if (!reactionExist) {
      throw new NotFoundError('Reação não encontrada');
    }
    const reactionData = {
      userId:
        (data.userId as typeof reactionExist.userId) || reactionExist.userId,
      materialId:
        (data.materialId as typeof reactionExist.materialId) ||
        reactionExist.materialId,
      disciplineId:
        (data.disciplineId as typeof reactionExist.disciplineId) ||
        reactionExist.disciplineId,
      type: (data.type as typeof reactionExist.type) || reactionExist.type,
    };
    const reactionAlreadyExists = await this.ReactionRepository.findByFiltres(
      reactionData,
    );
    if (reactionAlreadyExists.length > 0) {
      throw new AlreadyExistsError('Essa ação já foi feita');
    }
    const Reaction = await this.ReactionRepository.update(id, data);
    return { Reaction };
  }
}
