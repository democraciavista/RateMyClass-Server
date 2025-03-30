import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryReviewRepository } from '@repositories/in-memory/in-memory-review-repository';
import { NotFoundError } from '@errors/not-found-error';
import { StatisticService } from '@services/statistics';
import { Review } from '@prisma/client';
import { DeleteReviewUseCase } from './delete';

let reviewRepository: InMemoryReviewRepository;
let statisticService: StatisticService;
let sut: DeleteReviewUseCase;

describe('EraseReview Use Case', () => {
  beforeEach(() => {
    reviewRepository = new InMemoryReviewRepository();
    statisticService = {
      updateStatistics: vi.fn(),
    } as unknown as StatisticService;

    sut = new DeleteReviewUseCase(reviewRepository, statisticService);
  });

  it('should delete a review when it exists', async () => {
    const reviewData: Review = {
      id: 'review-123',
      disciplineId: 'discipline-xyz',
      userId: 'user-abc',
      passedFirstTry: true,
      finalGrade: 8,
      professorTeachingScore: 9,
      periodPaid: '2023-2',
      droppedOut: false,
      difficultyLevel: 7,
      disciplineScore: 8,
      comment: 'Ótima experiência!',
      recommendation: 'Recomendo muito!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await reviewRepository.create(reviewData);

    const { review } = await sut.execute(reviewData.id);

    expect(review).toEqual(reviewData);
    expect(statisticService.updateStatistics).toHaveBeenCalledWith(
      reviewData.disciplineId,
    );

    const deletedReview = await reviewRepository.findById(reviewData.id);
    expect(deletedReview).toBeNull();
  });

  it('should throw NotFoundError if the review does not exist', async () => {
    await expect(() => sut.execute('non-existent-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
