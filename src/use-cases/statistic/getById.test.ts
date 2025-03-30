import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryStatisticRepository } from '@repositories/in-memory/in-memory-statistic-repository';
import { NotFoundError } from '@errors/not-found-error';
import { Statistic } from '@prisma/client';
import { GetByIdStatisticUseCase } from './getById';

let statisticRepository: InMemoryStatisticRepository;
let sut: GetByIdStatisticUseCase;

describe('FetchStatisticById Use Case', () => {
  beforeEach(() => {
    statisticRepository = new InMemoryStatisticRepository();
    sut = new GetByIdStatisticUseCase(statisticRepository);
  });

  it('should return the correct statistic by id', async () => {
    const statisticData: Statistic = {
      id: 'statistic-001',
      disciplineId: 'discipline-abc',
      totalReviews: 10,
      averageGrades: 7.5,
      averageDifficulty: 6.2,
      createdAt: new Date(),
      updatedAt: new Date(),
      approvalRate: 0.8,
      averageTeachingScore: 8.0,
      disciplineScore: 7.5,
      dropoutRate: 0.1,
    };

    await statisticRepository.create(statisticData);

    const { statistic } = await sut.execute('statistic-001');

    expect(statistic).toEqual(statisticData);
  });

  it('should throw NotFoundError if statistic does not exist', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toThrow(NotFoundError);
  });
});
