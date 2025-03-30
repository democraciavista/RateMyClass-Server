import { AlreadyExistsError } from '@errors/already-exists-error';
import { $Enums, Reaction, Review } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';
import { IMaterialRepository } from '@repositories/interface/material-repository';
import { IReactionRepository } from '@repositories/interface/reaction-repository';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { StatisticService } from '@services/statistics';
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
  type?:
    | 'DeleteMaterial'
    | 'DeleteReview'
    | 'ReportMaterial'
    | 'ReportReview'
    | 'LikeMaterial'
    | 'LikeReview'
    | 'FavoriteMaterial'
    | 'FavoriteDiscipline'
    | undefined;
}
export class RegisterReactionUseCase {
  constructor(
    private disciplinaRepository: IDisciplineRepository,
    private materialRepository: IMaterialRepository,
    private reviewRepository: IReviewRepository,
    private reactionRepository: IReactionRepository,
    private statisticService: StatisticService,
  ) {}

  async execute(
    data: RegisterReactionUseCaseRequest,
  ): Promise<RegisterReactionUseCaseResponse> {
    try {
      let review: Review | null = null;
      let type:
        | 'DeleteMaterial'
        | 'DeleteReview'
        | 'ReportMaterial'
        | 'ReportReview'
        | 'LikeMaterial'
        | 'LikeReview'
        | 'FavoriteMaterial'
        | 'FavoriteDiscipline'
        | undefined;
      const reactionAlreadyExists = await this.reactionRepository.findByFiltres(
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

      if (data.disciplineId) {
        const discipline = await this.disciplinaRepository.findById(
          data.disciplineId,
        );
        if (!discipline) {
          throw new AlreadyExistsError('Essa disciplina não existe');
        }
      }
      if (data.materialId) {
        const material = await this.materialRepository.findById(
          data.materialId,
        );
        if (!material) {
          throw new AlreadyExistsError('Esse material não existe');
        }
      }
      if (data.reviewId) {
        const reviewData = await this.reviewRepository.findById(data.reviewId);
        if (!reviewData) {
          throw new AlreadyExistsError('Essa avaliação não existe');
        }
        review = reviewData;
      }
      if (data.type === 'REPORT') {
        const reactionsExist = await this.reactionRepository.findByFiltres({
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
            type = 'DeleteMaterial';
            return {
              Reaction: {} as Reaction,
              type,
            };
          }
          if (data.reviewId && review) {
            await this.reviewRepository.delete(data.reviewId);
            await this.statisticService.updateStatistics(review.disciplineId);
            type = 'DeleteReview';
            return{
              Reaction: {} as Reaction,
              type,
            }
          }
        }
        if (data.materialId) {
          type = 'ReportMaterial';
        }
        if (data.reviewId) {
          type = 'ReportReview';
        }
      }
      if (data.type === 'LIKE') {
        if (data.materialId) {
          type = 'LikeMaterial';
        }
        if (data.reviewId) {
          type = 'LikeReview';
        }
      }
      if (data.type === 'FAVORITE') {
        if (data.materialId) {
          type = 'FavoriteMaterial';
        }

        if (data.disciplineId) {
          type = 'FavoriteDiscipline';
        }
      }
      const Reaction = await this.reactionRepository.create(data);

      return { Reaction, type };
    } catch (error) {
      throw error;
    }
  }
}
