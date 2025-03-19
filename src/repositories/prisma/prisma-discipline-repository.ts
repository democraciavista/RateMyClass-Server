import prisma from '@database';
import { $Enums, Prisma } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

export class PrismaDisciplineRepository implements IDisciplineRepository {
  async findById(id: string) {
    const discipline = await prisma.discipline.findUnique({ where: { id } });
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
  ) {
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
      orderBy: {
        [ordemBy || 'createdAt']: ordem || 'asc',
      },
    });
    return disciplines;
  }
}
