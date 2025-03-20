import { AlreadyExistsError } from '@errors/already-exists-error';
import { NotFoundError } from '@errors/not-found-error';
import { Reaction, Prisma, $Enums } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';
import { IReactionRepository } from '@repositories/interface/reaction-repository';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { constants } from '@utils/constants';

interface RegisterReactionUseCaseResponse {
  Reaction: Reaction;
}

export class UpdateReactionUseCase {
  constructor(private ReactionRepository: IReactionRepository,
              private MaterialRepository: IMaterialRepository,
              private ReviewRepository: IReviewRepository,
  ) {}

  async execute(
    id: string,
    data: Prisma.ReactionUncheckedUpdateInput,
  ): Promise<RegisterReactionUseCaseResponse> {
    try {
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
        reviewId:
          (data.reviewId as typeof reactionExist.reviewId) ||
          reactionExist.reviewId,
      };
      const reactionAlreadyExists = await this.ReactionRepository.findByFiltres(
        reactionData,
      );
      if (reactionData.type === 'REPORT') {
        const reactionsExist = await this.ReactionRepository.findByFiltres({
          materialId: reactionData.materialId,
          reviewId: reactionData.reviewId,
          type: 'REPORT',
        });
        if (
          reactionsExist.length ===
          constants.REACTIONS.MAX_REPORTS_THRESHOLD - 1
        ) {
          if (reactionData.materialId) {
            await this.MaterialRepository.delete(reactionData.materialId);
          }
          if (reactionData.reviewId) {
            await this.ReviewRepository.delete(reactionData.reviewId);
          }
        }
      }

      if (reactionAlreadyExists.length > 0) {
        throw new AlreadyExistsError('Essa ação já foi feita');
      }
      const Reaction = await this.ReactionRepository.update(id, data);
      return { Reaction };
    } catch (error) {
      throw error;
    }
  }
}
