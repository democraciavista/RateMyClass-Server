import { PrismaReviewRepository } from '@repositories/prisma/prisma-review-repository';
import { PrismaStatisticRepository } from '@repositories/prisma/prisma-statistic-repository';
import { StatisticService } from '@services/statistics';
import { UpdateReviewUseCase } from '@use-cases/review/update';

export function makeUpdateReviewUseCase() {
  const reviewsRepository = new PrismaReviewRepository();
  const statisticRepository = new PrismaStatisticRepository();
  const statisticService = new StatisticService(
    reviewsRepository,
    statisticRepository,
  );

  const updateUseCase = new UpdateReviewUseCase(
    reviewsRepository,
    statisticService,
  );
  return updateUseCase;
}
