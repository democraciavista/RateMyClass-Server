import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryReviewRepository } from '@repositories/in-memory/in-memory-review-repository';
import { Review } from '@prisma/client';
import { GetAllReviewUseCase } from './getAll';

let reviewRepository: InMemoryReviewRepository;
let sut: GetAllReviewUseCase;

describe('FetchAllReviews Use Case', () => {
  beforeEach(() => {
    reviewRepository = new InMemoryReviewRepository();
    sut = new GetAllReviewUseCase(reviewRepository);
  });

  it('should return all reviews', async () => {
    const reviewData: Review[] = [
      {
        id: 'review-001',
        disciplineId: 'discipline-abc',
        userId: 'user-xyz',
        passedFirstTry: true,
        finalGrade: 8,
        professorTeachingScore: 9,
        periodPaid: '2023-2',
        droppedOut: false,
        difficultyLevel: 7,
        disciplineScore: 8,
        comment: 'Ótima matéria',
        recommendation: 'Recomendo muito!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'review-002',
        disciplineId: 'discipline-def',
        userId: 'user-uvw',
        passedFirstTry: false,
        finalGrade: 5,
        professorTeachingScore: 6,
        periodPaid: '2022-1',
        droppedOut: true,
        difficultyLevel: 9,
        disciplineScore: 5,
        comment: 'Muito difícil',
        recommendation: 'Somente para quem gosta',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await reviewRepository.create(reviewData[0]);
    await reviewRepository.create(reviewData[1]);

    const { reviews } = await sut.execute();

    expect(reviews).toHaveLength(2);
    expect(reviews).toEqual(expect.arrayContaining(reviewData));
  });

  it('should return an empty array if no reviews exist', async () => {
    const { reviews } = await sut.execute();
    expect(reviews).toHaveLength(0);
  });
});
