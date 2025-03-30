import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository'; // Substitua pelo caminho correto
import { $Enums, Prisma } from '@prisma/client';
import { GetAllByFiltresDisciplineUseCase } from './getAllByFiltres';

let disciplineRepository: InMemoryDisciplineRepository;
let getAllByFiltersSut: GetAllByFiltresDisciplineUseCase;

describe('GetAllByFiltresDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    getAllByFiltersSut = new GetAllByFiltresDisciplineUseCase(
      disciplineRepository,
    );
  });

  it('should return disciplines filtered by name', async () => {
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

    const { disciplines } = await getAllByFiltersSut.execute({
      name: 'Mathematics',
    });

    expect(disciplines).toBeDefined();
    expect(disciplines.length).toBe(1);
    expect(disciplines[0].name).toBe('Mathematics');
  });

  it('should return an empty list if no discipline matches filters', async () => {
    const { disciplines } = await getAllByFiltersSut.execute({
      name: 'Non-existent',
    });

    expect(disciplines).toBeDefined();
    expect(disciplines.length).toBe(0);
  });

  it('should return disciplines ordered by period', async () => {
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

    const { disciplines } = await getAllByFiltersSut.execute({
      ordemBy: 'period',
      ordem: Prisma.SortOrder.asc,
    });

    expect(disciplines).toBeDefined();
    expect(disciplines.length).toBe(2);
    expect(disciplines[0].period).toBe(1);
    expect(disciplines[1].period).toBe(2);
  });
});
