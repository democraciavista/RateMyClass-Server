import { PrismaMaterialRepository } from "@repositories/prisma/prisma-material-repository";
import { PrismaReactionRepository } from "@repositories/prisma/prisma-reaction-repository";
import { PrismaReviewRepository } from "@repositories/prisma/prisma-review-repository";
import { UpdateReactionUseCase } from "@use-cases/reaction/update";

export function makeUpdateReactionUseCase() {
  const ReactionsRepository = new PrismaReactionRepository();
  const ReviewsRepository = new PrismaReviewRepository();
  const MaterialRepository = new PrismaMaterialRepository();
  
  const updateUseCase = new UpdateReactionUseCase(ReactionsRepository,
    MaterialRepository,
    ReviewsRepository,
  );
  return updateUseCase;
}
