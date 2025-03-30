import { NotFoundError } from '@errors/not-found-error';
import { Review } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';
interface GetByIdReviewUseCaseResponse {
  review: Review;
}

export class GetByIdReviewUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(id: string): Promise<GetByIdReviewUseCaseResponse> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new NotFoundError('Avaliação não encontrada');
    }

    return { review };
  }
}
