import prisma from '@database';
import {
  $Enums,
  Discipline,
  Prisma,
  Reaction,
  Review,
  Statistic,
} from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

export class PrismaDisciplineRepository implements IDisciplineRepository {
  async findById(id: string): Promise<
    | (Discipline & {
        reviews: Review[];
        statistics: Statistic | null;
      })
    | null
  > {
    const discipline = await prisma.discipline.findUnique({
      where: { id },
      include: { statistics: true, reviews: true },
    });
    return discipline;
  }
  async create(data: Prisma.DisciplineCreateInput) {
    const discipline = await prisma.discipline.create({ data });
    return discipline;
  }
  async delete(id: string) {
    const discipline = await prisma.discipline.delete({ where: { id } });
    return discipline;
  }
  async update(id: string, data: Prisma.DisciplineUpdateInput) {
    const discipline = await prisma.discipline.update({ where: { id }, data });
    return discipline;
  }
  async findAll() {
    const disciplines = await prisma.discipline.findMany();
    return disciplines;
  }
  async findByName(name: string) {
    const discipline = await prisma.discipline.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return discipline;
  }
  async findByFiltres(
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
  ): Promise<
    (Discipline & {
      reactions: Reaction[];
      statistics: Statistic | null;
    })[]
  > {
    const disciplines = await prisma.discipline.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        code: code ? { contains: code } : undefined,
        course: course ? { contains: course } : undefined,
        professor: professor ? { contains: professor } : undefined,
        center: center ? { contains: center } : undefined,
        period: period ? { equals: period } : undefined,
        type: type ? { equals: type } : undefined,
      },
      include: {
        reactions: {
          where: {
            userId: userId,
            type: 'FAVORITE',
          },
        },
        statistics: true,
      },
      orderBy: {
        [ordemBy || 'createdAt']: ordem || 'asc',
      },
    });
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
  ): Promise<
    (Discipline & {
      reactions: Reaction[];
      statistics: Statistic | null;
    })[]
  > {
    const disciplines = await prisma.discipline.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        code: code ? { contains: code } : undefined,
        course: course ? { contains: course } : undefined,
        professor: professor ? { contains: professor } : undefined,
        center: center ? { contains: center } : undefined,
        period: period ? { equals: period } : undefined,
        type: type ? { equals: type } : undefined,
        reactions: {
          some: {
            AND: {
              userId: userId,
              type: 'FAVORITE',
            },
          },
        },
      },
      include: {
        reactions: true,
        statistics: true,
      },
      orderBy: {
        [ordemBy || 'createdAt']: ordem || 'asc',
      },
    });
    return disciplines;
  }
  async findDisciplineWtithReview(disciplineId: string, userId: string) {
    const discipline = await prisma.discipline.findUnique({
      where: { id: disciplineId, reviews: { some: { userId } } },
    });
    return discipline;
  }
}
