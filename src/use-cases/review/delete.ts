import { NotFoundError } from '@errors/not-found-error';
import { Review } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { StatisticService } from '@services/statistics';

interface RegisterReviewUseCaseResponse {
  review: Review;
}

export class DeleteReviewUseCase {
  constructor(
    private ReviewRepository: IReviewRepository,
    private statisticService: StatisticService,
  ) {}

  async execute(id: string): Promise<RegisterReviewUseCaseResponse> {
    const reviewExist = await this.ReviewRepository.findById(id);
    if (!reviewExist) {
      throw new NotFoundError('Avaliação não encontrada');
    }
    const review = await this.ReviewRepository.delete(id);
    await this.statisticService.updateStatistics(reviewExist.disciplineId);

    return { review };
  }
}
