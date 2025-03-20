import { AlreadyExistsError } from '@errors/already-exists-error';
import { $Enums, Reaction } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';
import { IReactionRepository } from '@repositories/interface/reaction-repository';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { constants } from '@utils/constants';

interface RegisterReactionUseCaseRequest {
  userId: string;
  materialId?: string;
  disciplineId?: string;
  type: $Enums.ReactionType;
  reviewId?: string;
}

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction;
}
export class RegisterReactionUseCase {
  constructor(
    private disciplinaRepository: IReactionRepository,
    private materialRepository: IMaterialRepository,
    private reviewRepository: IReviewRepository,
  ) {}

  async execute(
    data: RegisterReactionUseCaseRequest,
  ): Promise<RegisterReactionUseCaseResponse> {
    try {
      const reactionAlreadyExists =
        await this.disciplinaRepository.findByFiltres({
          userId: data.userId,
          materialId: data.materialId,
          disciplineId: data.disciplineId,
          type: data.type,
        });
      if (reactionAlreadyExists.length > 0) {
        throw new AlreadyExistsError('Essa ação já foi feita');
      }
      if (data.type === 'REPORT') {
        const reactionsExist = await this.disciplinaRepository.findByFiltres({
          materialId: data.materialId,
          reviewId: data.reviewId,
          type: 'REPORT',
        });
        if (
          reactionsExist.length ===
          constants.REACTIONS.MAX_REPORTS_THRESHOLD - 1
        ) {
          if (data.materialId) {
            await this.materialRepository.delete(data.materialId);
          }
          if (data.reviewId) {
            await this.reviewRepository.delete(data.reviewId);
          }
        }
      }
      const Reaction = await this.disciplinaRepository.create(data);

      return { Reaction };
    } catch (error) {
      throw error;
    }
  }
}
