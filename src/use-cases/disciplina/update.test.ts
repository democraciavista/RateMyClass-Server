import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository'; // Substitua pelo caminho correto
import { UpdateDisciplineUserCase } from './update';
import { NotFoundError } from '@errors/not-found-error';
import { $Enums } from '@prisma/client';

let disciplineRepository: InMemoryDisciplineRepository;
let sut: UpdateDisciplineUserCase;

describe('UpdateDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    sut = new UpdateDisciplineUserCase(disciplineRepository);
  });

  it('should update an existing discipline successfully', async () => {
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

    const updateData = {
      name: 'Advanced Mathematics',
      professor: 'Professor Y',
    };

    const { discipline } = await sut.execute(existingDiscipline.id, updateData);

    expect(discipline).toBeDefined();
    expect(discipline.name).toEqual(updateData.name);
    expect(discipline.professor).toEqual(updateData.professor);
  });

  it('should throw NotFoundError when discipline does not exist', async () => {
    const updateData = {
      name: 'Advanced Mathematics',
    };

    await expect(() =>
      sut.execute('non-existent-id', updateData),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
