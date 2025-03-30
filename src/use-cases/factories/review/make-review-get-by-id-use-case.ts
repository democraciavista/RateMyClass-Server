import { PrismaReviewRepository } from '@repositories/prisma/prisma-review-repository';
import { GetByIdReviewUseCase } from '@use-cases/review/getById';

function makeGetByIdReviewUseCase() {
  const reviewRepository = new PrismaReviewRepository();
  return new GetByIdReviewUseCase(reviewRepository);
}
export { makeGetByIdReviewUseCase };
