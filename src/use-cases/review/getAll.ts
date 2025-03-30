import { Review } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';

interface RegisterReviewUseCaseResponse {
  reviews: Review[];
}

export class GetAllReviewUseCase {
  constructor(private ReviewRepository: IReviewRepository) {}

  async execute(): Promise<RegisterReviewUseCaseResponse> {
    const reviews = await this.ReviewRepository.findAll();
    return { reviews };
  }
}
