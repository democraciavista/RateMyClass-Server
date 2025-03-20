import { AlreadyExistsError } from '@errors/already-exists-error';
import { $Enums, Reaction } from '@prisma/client';
import { IReactionRepository } from '@repositories/interface/reaction-repository';

interface RegisterReactionUseCaseRequest {
  userId: string;
  materialId?: string;
  disciplineId?: string;
  type: $Enums.ReactionType;
}

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction;
}
export class RegisterReactionUseCase {
  constructor(private disciplinaRepository: IReactionRepository) {}

  async execute(
    data: RegisterReactionUseCaseRequest,
  ): Promise<RegisterReactionUseCaseResponse> {
    const reactionAlreadyExists = await this.disciplinaRepository.findByFiltres(
      {
        userId: data.userId,
        materialId: data.materialId,
        disciplineId: data.disciplineId,
        type: data.type,
      },
    );
    if (reactionAlreadyExists.length > 0) {
      throw new AlreadyExistsError('Essa ação já foi feita');
    }
    const Reaction = await this.disciplinaRepository.create(data);

    return { Reaction };
  }
}
