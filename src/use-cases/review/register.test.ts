import { beforeEach, describe, expect, it,vi } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository';
import { InMemoryReviewRepository } from '@repositories/in-memory/in-memory-review-repository';
import { StatisticService } from '@services/statistics';
import { RegisterReviewUseCase } from './register';
import { AlreadyExistsError } from '@errors/already-exists-error';
import { $Enums, Review } from '@prisma/client';

let disciplineRepository: InMemoryDisciplineRepository;
let reviewRepository: InMemoryReviewRepository;
let statisticService: StatisticService;
let sut: RegisterReviewUseCase;

describe('SubmitCourseReview Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    reviewRepository = new InMemoryReviewRepository();
    statisticService = {
      updateStatistics: vi.fn(),
    } as unknown as StatisticService;

    sut = new RegisterReviewUseCase(
      disciplineRepository,
      reviewRepository,
      statisticService,
    );
  });

  it('should successfully register a new review when it does not exist', async () => {
    const reviewData: Review = {
      id: 'review-123',
      disciplineId: 'discipline-abc',
      userId: 'user-xyz',
      passedFirstTry: true,
      finalGrade: 9,
      professorTeachingScore: 8,
      periodPaid: '2024-1',
      droppedOut: false,
      difficultyLevel: 7,
      disciplineScore: 9,
      comment: 'Ótima disciplina!',
      recommendation: 'Recomendo para quem gosta de desafios.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { review } = await sut.execute(reviewData);

    expect(review).toEqual(reviewData);
    expect(statisticService.updateStatistics).toHaveBeenCalledWith(
      reviewData.disciplineId,
    );
  });

  it('should throw AlreadyExistsError if the review already exists', async () => {
    const existingReview = {
      id: 'discipline-abc',
      name: 'Mathematics',
      code: 'MATH101',
      professor: 'Professor X',
      course: 'Engineering',
      center: 'Science Center',
      period: 1,
      type: $Enums.CourseType.MANDATORY,
      hours: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user-xyz',
    };

    vi
      .spyOn(disciplineRepository, 'findDisciplineWtithReview')
      .mockResolvedValueOnce(existingReview);

    const reviewData = {
      id: 'review-456',
      disciplineId: 'discipline-abc',
      userId: 'user-xyz',
      passedFirstTry: false,
      finalGrade: 7,
      professorTeachingScore: 6,
      periodPaid: '2024-1',
      droppedOut: false,
      difficultyLevel: 5,
      disciplineScore: 7,
      comment: 'Foi uma experiência mediana.',
      recommendation: 'Depende do professor.',
    };

    await expect(() => sut.execute(reviewData)).rejects.toBeInstanceOf(
      AlreadyExistsError,
    );
  });
});
