import { PrismaReviewRepository } from '@repositories/prisma/prisma-review-repository';
import { PrismaStatisticRepository } from '@repositories/prisma/prisma-statistic-repository';
import { StatisticService } from '@services/statistics';
import { DeleteReviewUseCase } from '@use-cases/review/delete';

export function makeDeleteReviewUseCase() {
  const reviewRepository = new PrismaReviewRepository();
  const statisticRepository = new PrismaStatisticRepository();
  const statisticService = new StatisticService(
    reviewRepository,
    statisticRepository,
  );
  const deleteUseCase = new DeleteReviewUseCase(
    reviewRepository,
    statisticService,
  );
  return deleteUseCase;
}
