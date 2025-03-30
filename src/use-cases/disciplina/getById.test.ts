import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository'; // Substitua pelo caminho correto
import { NotFoundError } from '@errors/not-found-error';
import { $Enums } from '@prisma/client';
import { GetByIdDisciplineUseCase } from './getById';

let disciplineRepository: InMemoryDisciplineRepository;
let getByIdSut: GetByIdDisciplineUseCase;

describe('GetByIdDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    getByIdSut = new GetByIdDisciplineUseCase(disciplineRepository);
  });

  it('should return a discipline when it exists', async () => {
    const existingDiscipline = await disciplineRepository.create({
      code: 'MATH101',
      name: 'Mathematics',
      professor: 'Professor X',
      center: 'Science Center',
      period: 1,
      hours: 60,
      course: 'Engineering',
      type: $Enums.CourseType.MANDATORY,
    });

    const { discipline } = await getByIdSut.execute(existingDiscipline.id);

    expect(discipline).toBeDefined();
    expect(discipline.id).toEqual(existingDiscipline.id);
  });

  it('should throw NotFoundError when discipline does not exist', async () => {
    await expect(() =>
      getByIdSut.execute('non-existent-id'),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
