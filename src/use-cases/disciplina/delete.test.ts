import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository'; // Substitua pelo caminho correto
import { DeleteDisciplineUseCase } from './delete';
import { NotFoundError } from '@errors/not-found-error';
import { $Enums } from '@prisma/client';

let disciplineRepository: InMemoryDisciplineRepository;
let deleteSut: DeleteDisciplineUseCase;

describe('DeleteDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    deleteSut = new DeleteDisciplineUseCase(disciplineRepository);
  });

  it('should delete an existing discipline successfully', async () => {
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

    const { discipline } = await deleteSut.execute(existingDiscipline.id);

    expect(discipline).toBeDefined();
    expect(discipline.id).toEqual(existingDiscipline.id);
  });

  it('should throw NotFoundError when discipline does not exist for deletion', async () => {
    await expect(() =>
      deleteSut.execute('non-existent-id'),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
