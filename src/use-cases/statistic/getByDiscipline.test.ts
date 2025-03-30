import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryStatisticRepository } from '@repositories/in-memory/in-memory-statistic-repository';
import { NotFoundError } from '@errors/not-found-error';
import { Statistic } from '@prisma/client';
import { GetByDisciplineStatisticUseCase } from './getByDiscipline';

let statisticRepository: InMemoryStatisticRepository;
let sut: GetByDisciplineStatisticUseCase;

describe('GetByDisciplineStatistic Use Case', () => {
  beforeEach(() => {
    statisticRepository = new InMemoryStatisticRepository(); // Repositório em memória para testes
    sut = new GetByDisciplineStatisticUseCase(statisticRepository); // Caso de uso
  });

  it('should return the statistic for the given discipline id', async () => {
    const statisticData: Statistic = {
      id: 'statistic-001',
      disciplineId: 'discipline-abc', 
      totalReviews: 10,
      averageGrades: 7.5,
      averageDifficulty: 6.2,
      approvalRate: 0.8,
      averageTeachingScore: 8.0,
      disciplineScore: 7.5,
      dropoutRate: 0.1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await statisticRepository.create(statisticData);

    const { statistic } = await sut.execute('discipline-abc');

    expect(statistic).toEqual(statisticData);
  });

  it('should throw NotFoundError if no statistic is found for the discipline', async () => {
    await expect(sut.execute('non-existing-discipline')).rejects.toThrow(
      NotFoundError,
    );
  });
});
