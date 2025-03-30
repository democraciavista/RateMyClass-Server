import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository'; // Substitua pelo caminho correto
import { GetAllDisciplineUseCase } from './getAll';
import { $Enums } from '@prisma/client';

let disciplineRepository: InMemoryDisciplineRepository;
let getAllSut: GetAllDisciplineUseCase;

describe('GetAllDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    getAllSut = new GetAllDisciplineUseCase(disciplineRepository);
  });

  it('should return all disciplines', async () => {
    await disciplineRepository.create({
      code: 'MATH101',
      name: 'Mathematics',
      professor: 'Professor X',
      center: 'Science Center',
      period: 1,
      hours: 60,
      course: 'Engineering',
      type: $Enums.CourseType.MANDATORY,
    });

    await disciplineRepository.create({
      code: 'PHY101',
      name: 'Physics',
      professor: 'Professor Y',
      center: 'Science Center',
      period: 2,
      hours: 45,
      course: 'Engineering',
      type: $Enums.CourseType.MANDATORY,
    });

    const { disciplines } = await getAllSut.execute();

    expect(disciplines).toBeDefined();
    expect(disciplines.length).toBe(2);
  });

  it('should return an empty list when no disciplines exist', async () => {
    const { disciplines } = await getAllSut.execute();

    expect(disciplines).toBeDefined();
    expect(disciplines.length).toBe(0);
  });
});
