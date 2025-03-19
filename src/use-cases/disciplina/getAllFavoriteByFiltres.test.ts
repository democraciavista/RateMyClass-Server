import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryDisciplineRepository } from '@repositories/in-memory/in-memory-discipline-repository';
import { $Enums, Discipline, Prisma } from '@prisma/client';
import { GetAllFavoriteByFiltresDisciplineUseCase } from './getAllFavoriteByFiltres';

let disciplineRepository: InMemoryDisciplineRepository;
let sut: GetAllFavoriteByFiltresDisciplineUseCase;

describe('GetAllFavoriteByFiltresDiscipline Use Case', () => {
  beforeEach(() => {
    disciplineRepository = new InMemoryDisciplineRepository();
    sut = new GetAllFavoriteByFiltresDisciplineUseCase(disciplineRepository);
  });

  it('should get all favorite disciplines based on filters', async () => {
    const userId = 'user-123';

    const disciplines = [
      {
        id: '1',
        name: 'Math',
        professor: 'Professor A',
        code: 'MATH101',
        center: 'Science Center',
        period: 1,
        hours: 60,
        course: 'Mathematics',
        type: $Enums.CourseType.MANDATORY,
        createdAt: new Date(),
        updatedAt: new Date(),
        reactions: [
          {
            id: '2',
            userId: 'user-123',
            type: $Enums.ReactionType.FAVORITE,
            disciplineId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: '2',
        name: 'Computer Science',
        professor: 'Professor B',
        code: 'CS101',
        center: 'Tech Center',
        period: 1,
        hours: 60,
        course: 'Computer Science',
        type: $Enums.CourseType.ELECTIVE_FREE,
        createdAt: new Date(),
        updatedAt: new Date(),
        reactions: [
          {
            id: '1',
            userId: 'user-123',
            type: $Enums.ReactionType.FAVORITE,
            disciplineId: '2',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    for (const discipline of disciplines) {
      await disciplineRepository.addItemWithFavorite(discipline);
    }

    const filters = {
      userId,
      type: $Enums.CourseType.MANDATORY,
      name: 'Math',
      ordem: Prisma.SortOrder.asc,
      ordemBy: 'name',
    };

    const { disciplines: filteredDisciplines } = await sut.execute(filters);

    expect(filteredDisciplines.length).toBe(1);
    expect(filteredDisciplines[0].name).toEqual('Math');
    expect(filteredDisciplines[0].type).toEqual($Enums.CourseType.MANDATORY);
  });

  it('should return empty array when no favorite disciplines match the filters', async () => {
    const userId = 'user-123';

    const filters = {
      userId,
      type: $Enums.CourseType.MANDATORY,
      name: 'Nonexistent Discipline',
    };

    const { disciplines: filteredDisciplines } = await sut.execute(filters);

    expect(filteredDisciplines.length).toBe(0);
  });

  it('should return all favorite disciplines if no filters are applied', async () => {
    const userId = 'user-123';

    const disciplines= [
      {
        id: '1',
        name: 'Math',
        professor: 'Professor A',
        code: 'MATH101',
        center: 'Science Center',
        period: 1,
        hours: 60,
        course: 'Mathematics',
        type: $Enums.CourseType.MANDATORY,
        createdAt: new Date(),
        updatedAt: new Date(),
        reactions: []
      },
      {
        id: '2',
        name: 'Computer Science',
        professor: 'Professor B',
        code: 'CS101',
        center: 'Tech Center',
        period: 1,
        hours: 60,
        course: 'Computer Science',
        type: $Enums.CourseType.ELECTIVE_FREE,
        createdAt: new Date(),
        updatedAt: new Date(),
        reactions: []
      },
    ];

    for (const discipline of disciplines) {
      await disciplineRepository.addItemWithFavorite(discipline);
    }

    const filters = {
      userId,
    };

    const { disciplines: allFavoriteDisciplines } = await sut.execute(filters);

    expect(allFavoriteDisciplines.length).toBe(2);
    expect(allFavoriteDisciplines[0].name).toEqual('Math');
    expect(allFavoriteDisciplines[1].name).toEqual('Computer Science');
  });
});
