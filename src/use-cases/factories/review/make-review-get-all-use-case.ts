import { PrismaReviewRepository } from "@repositories/prisma/prisma-review-repository";
import { GetAllReviewUseCase } from "@use-cases/review/getAll";

export function makeGetAllReviewUseCase() {
  const reviewRepository = new PrismaReviewRepository();
  const getAllUseCase = new GetAllReviewUseCase(reviewRepository);
  return getAllUseCase;



}