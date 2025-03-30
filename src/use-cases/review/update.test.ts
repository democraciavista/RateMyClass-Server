import { NotFoundError } from '@errors/not-found-error';
import { Review, Prisma } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { StatisticService } from '@services/statistics';

interface ModifyStudentReviewUseCaseResponse {
  review: Review;
}

export class ModifyStudentReviewUseCase {
  constructor(
    private reviewRepository: IReviewRepository,
    private statisticService: StatisticService,
  ) {}

  async execute(
    id: string,
    data: Prisma.ReviewUncheckedUpdateInput,
  ): Promise<ModifyStudentReviewUseCaseResponse> {
    const reviewExist = await this.reviewRepository.findById(id);
    if (!reviewExist) {
      throw new NotFoundError('Avaliação não encontrada');
    }

    const review = await this.reviewRepository.update(id, data);
    await this.statisticService.updateStatistics(review.disciplineId);

    return { review };
  }
}
