import { PrismaDisciplineRepository } from '@repositories/prisma/prisma-discipline-repository';
import { PrismaReviewRepository } from '@repositories/prisma/prisma-review-repository';
import { PrismaStatisticRepository } from '@repositories/prisma/prisma-statistic-repository';
import { StatisticService } from '@services/statistics';
import { RegisterReviewUseCase } from '@use-cases/review/register';

export function makeRegisterReviewUseCase() {
  const reviewsRepository = new PrismaReviewRepository();
  const statisticRepository = new PrismaStatisticRepository();
  const statisticService = new StatisticService(
    reviewsRepository,
    statisticRepository,
  );
  const disciplinaryRepository = new PrismaDisciplineRepository();
  const registerUseCase = new RegisterReviewUseCase(
    disciplinaryRepository,
    reviewsRepository,
    statisticService,
  );
  return registerUseCase;
}
