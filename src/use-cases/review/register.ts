import { AlreadyExistsError } from '@errors/already-exists-error';
import { Review } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { StatisticService } from '@services/statistics';

interface RegisterReviewUseCaseRequest {
  disciplineId: string;
  userId: string;
  passedFirstTry: boolean;
  finalGrade: number;
  professorTeachingScore: number;
  periodPaid: string;
  droppedOut: boolean;
  difficultyLevel: number;
  disciplineScore: number;
  comment: string | null;
  recommendation: string | null;
}

interface RegisterReviewUseCaseResponse {
  review: Review;
}
export class RegisterReviewUseCase {
  constructor(
    private disciplinaRepository: IDisciplineRepository,
    private reviewRepository: IReviewRepository,
    private statisticService: StatisticService,
  ) {}

  async execute(
    data: RegisterReviewUseCaseRequest,
  ): Promise<RegisterReviewUseCaseResponse> {
    const { disciplineId, userId, ...rest } = data;
    const reviewAlreadyExists =
      await this.disciplinaRepository.findDisciplineWtithReview(
        data.disciplineId,
        data.userId,
      );
    if (reviewAlreadyExists) {
      throw new AlreadyExistsError('Essa avaliação já foi feita');
    }

    const review = await this.reviewRepository.create(data);
    await this.statisticService.updateStatistics(disciplineId);

    return { review };
  }
}
