import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { PrismaReactionRepository } from '@repositories/prisma/prisma-reaction-repository';
import { PrismaReviewRepository } from '@repositories/prisma/prisma-review-repository';
import { RegisterReactionUseCase } from '@use-cases/reaction/register';

export function makeRegisterReactionUseCase() {
  const ReactionsRepository = new PrismaReactionRepository();
  const MaterialRepository = new PrismaMaterialRepository();
  const ReviewsRepository = new PrismaReviewRepository();
  const registerUseCase = new RegisterReactionUseCase(
    ReactionsRepository,
    MaterialRepository,
    ReviewsRepository,
  );
  return registerUseCase;
}
