import { $Enums, Discipline, Prisma, Reaction } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryDisciplineRepository implements IDisciplineRepository {
  public items: (Discipline & { reactions?: Reaction[] })[] = [];
  async create(data: Prisma.DisciplineUncheckedCreateInput) {
    const discipline: Discipline = {
      id: randomUUID(),
      name: data.name,
      code: data.code,
      course: data.course,
      center: data.center,
      period: data.period as number,
      professor: data.professor,
      type: data.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      hours: data.hours,
    };
    this.items.push(discipline);
    return discipline;
  }
  async findById(id: string) {
    const discipline = this.items.find((item) => item.id === id);
    if (!discipline) {
      return null;
    }
    return discipline;
  }
  async findByName(name: string) {
    const disciplines = this.items.filter((item) => item.name === name);
    return disciplines;
  }
  async delete(id: string) {
    const disciplineIndex = this.items.findIndex((item) => item.id === id);
    const discipline = this.items[disciplineIndex];
    this.items.splice(disciplineIndex, 1);
    return discipline;
  }
  async update(id: string, data: Prisma.DisciplineUpdateInput) {
    const disciplineIndex = this.items.findIndex((item) => item.id === id);
    const discipline = this.items[disciplineIndex];
    this.items[disciplineIndex] = {
      ...discipline,
      ...(data as Discipline),
      updatedAt: new Date(),
    };
    return this.items[disciplineIndex];
  }
  async findAll() {
    return this.items;
  }
  async findByFiltres(
    name?: string,
    code?: string,
    course?: string,
    center?: string,
    period?: number,
    professor?: string,
    type?: $Enums.CourseType,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) {
    let disciplines = this.items;
    if (name) {
      disciplines = disciplines.filter((discipline) =>
        discipline.name.includes(name),
      );
    }
    if (code) {
      disciplines = disciplines.filter((discipline) =>
        discipline.code.includes(code),
      );
    }
    if (course) {
      disciplines = disciplines.filter((discipline) =>
        discipline.course.includes(course),
      );
    }
    if (center) {
      disciplines = disciplines.filter((discipline) =>
        discipline.center.includes(center),
      );
    }
    if (period) {
      disciplines = disciplines.filter(
        (discipline) => discipline.period === period,
      );
    }
    if (professor) {
      disciplines = disciplines.filter((discipline) =>
        discipline.professor.includes(professor),
      );
    }
    if (type) {
      disciplines = disciplines.filter(
        (discipline) => discipline.type === type,
      );
    }

    if (ordem && ordemBy && disciplines.length > 0) {
      disciplines = disciplines.sort((a, b) => {
        const valueA = a[ordemBy as keyof Discipline];
        const valueB = b[ordemBy as keyof Discipline];

        if (valueA == null || valueB == null) return 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return ordem === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return ordem === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });
    }

    return disciplines;
  }
  async findFavoriteByFiltres(
    userId: string,
    name?: string,
    code?: string,
    course?: string,
    center?: string,
    period?: number,
    professor?: string,
    type?: $Enums.CourseType,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) {
    let disciplines = this.items;
    if (name) {
      disciplines = disciplines.filter((discipline) =>
        discipline.name.includes(name),
      );
    }
    if (code) {
      disciplines = disciplines.filter((discipline) =>
        discipline.code.includes(code),
      );
    }
    if (course) {
      disciplines = disciplines.filter((discipline) =>
        discipline.course.includes(course),
      );
    }
    if (center) {
      disciplines = disciplines.filter((discipline) =>
        discipline.center.includes(center),
      );
    }
    if (period) {
      disciplines = disciplines.filter(
        (discipline) => discipline.period === period,
      );
    }
    if (professor) {
      disciplines = disciplines.filter((discipline) =>
        discipline.professor.includes(professor),
      );
    }
    if (type) {
      disciplines = disciplines.filter(
        (discipline) => discipline.type === type,
      );
    }
    disciplines = disciplines.filter((discipline) =>
      discipline.reactions?.some((reaction) => {
        return (
          reaction.userId === userId && reaction.type === 'FAVORITE'
        );
      }
    ));
   

    if (ordem && ordemBy && disciplines.length > 0) {
      disciplines = disciplines.sort((a, b) => {
        const valueA = a[ordemBy as keyof Discipline];
        const valueB = b[ordemBy as keyof Discipline];

        if (valueA == null || valueB == null) return 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return ordem === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return ordem === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });
    }

    return disciplines;
  }
}
