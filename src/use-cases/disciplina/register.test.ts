import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository'; // Substitua pelo caminho correto
import { RegisterDisciplineUseCase } from './register';
import { $Enums } from '@prisma/client';

let disciplineRepository: InMemoryDisciplineRepository;
let sut: RegisterDisciplineUseCase;

describe('RegisterDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    sut = new RegisterDisciplineUseCase(disciplineRepository);
  });

  it('should register a new discipline successfully', async () => {
    const disciplineData = {
      code: 'MATH101',
      name: 'Mathematics',
      professor: 'Professor X',
      center: 'Science Center',
      period: 1,
      hours: 60,
      course: 'Engineering',
      type: $Enums.CourseType.MANDATORY,
    };

    const discipline = await sut.execute(disciplineData);

    expect(discipline).toBeDefined();
    expect(discipline.code).toEqual(disciplineData.code);
    expect(discipline.name).toEqual(disciplineData.name);
    expect(discipline.professor).toEqual(disciplineData.professor);
    expect(discipline.center).toEqual(disciplineData.center);
    expect(discipline.period).toEqual(disciplineData.period);
    expect(discipline.hours).toEqual(disciplineData.hours);
    expect(discipline.course).toEqual(disciplineData.course);
    expect(discipline.type).toEqual(disciplineData.type);
  });
});
