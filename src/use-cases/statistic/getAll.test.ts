import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryStatisticRepository } from '@repositories/in-memory/in-memory-statistic-repository';
import { NotFoundError } from '@errors/not-found-error';
import { Statistic } from '@prisma/client';
import { GetAllStatisticUseCase } from './getAll';

let statisticRepository: InMemoryStatisticRepository;
let sut: GetAllStatisticUseCase;

describe('GetAllStatistic Use Case', () => {
  beforeEach(() => {
    statisticRepository = new InMemoryStatisticRepository(); // Usando repositório em memória
    sut = new GetAllStatisticUseCase(statisticRepository); // Instanciando o caso de uso
  });

  it('should return all statistics', async () => {
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

    const { statistics } = await sut.execute();

    expect(statistics).toHaveLength(1);
    expect(statistics[0]).toEqual(statisticData);
  });

  it('should throw NotFoundError if no statistics are found', async () => {
    await expect(sut.execute()).rejects.toThrow(NotFoundError);
  });
});
