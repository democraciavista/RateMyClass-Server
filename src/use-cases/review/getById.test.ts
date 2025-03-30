import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryReviewRepository } from '@repositories/in-memory/in-memory-review-repository';
import { NotFoundError } from '@errors/not-found-error';
import { StatisticService } from '@services/statistics';
import { Review, Prisma } from '@prisma/client';
import { UpdateReviewUseCase } from './update';

let reviewRepository: InMemoryReviewRepository;
let statisticService: StatisticService;
let sut: UpdateReviewUseCase;

describe('ReviseReview Use Case', () => {
  beforeEach(() => {
    reviewRepository = new InMemoryReviewRepository();
    statisticService = {
      updateStatistics: vi.fn(),
    } as unknown as StatisticService;

    sut = new UpdateReviewUseCase(reviewRepository, statisticService);
  });

  it('should update a review when it exists', async () => {
    const reviewData: Review = {
      id: 'review-456',
      disciplineId: 'discipline-xyz',
      userId: 'user-abc',
      passedFirstTry: true,
      finalGrade: 7,
      professorTeachingScore: 6,
      periodPaid: '2023-1',
      droppedOut: false,
      difficultyLevel: 5,
      disciplineScore: 6,
      comment: 'Bom curso',
      recommendation: 'Vale a pena',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await reviewRepository.create(reviewData);

    const updatedData: Prisma.ReviewUncheckedUpdateInput = {
      finalGrade: 9,
      professorTeachingScore: 8,
      comment: 'Curso excelente!',
    };

    const { review } = await sut.execute(reviewData.id, updatedData);

    expect(review.finalGrade).toBe(9);
    expect(review.professorTeachingScore).toBe(8);
    expect(review.comment).toBe('Curso excelente!');
    expect(statisticService.updateStatistics).toHaveBeenCalledWith(
      reviewData.disciplineId,
    );
  });

  it('should throw NotFoundError if the review does not exist', async () => {
    await expect(() =>
      sut.execute('non-existent-id', { finalGrade: 10 }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
