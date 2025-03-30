import { AlreadyExistsError } from '@errors/already-exists-error';
import { NotFoundError } from '@errors/not-found-error';
import { Review, Prisma } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { StatisticService } from '@services/statistics';

interface RegisterreviewUseCaseResponse {
  review: Review;
}

export class UpdateReviewUseCase {
  constructor(
    private reviewRepository: IReviewRepository,
    private statisticService: StatisticService,
  ) {}

  async execute(
    id: string,
    data: Prisma.ReviewUncheckedUpdateInput,
  ): Promise<RegisterreviewUseCaseResponse> {
    const reviewExist = await this.reviewRepository.findById(id);
    if (!reviewExist) {
      throw new NotFoundError('Avaliação não encontrada');
    }

    const reviewAlreadyExists = await this.reviewRepository.findById(id);

    if (reviewAlreadyExists) {
      throw new AlreadyExistsError('Essa Avaliação já foi feita');
    }
    const review = await this.reviewRepository.update(id, data);
    await this.statisticService.updateStatistics(review.disciplineId);
    return { review };
  }
}
