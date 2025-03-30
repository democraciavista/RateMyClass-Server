import prisma from '@database';
import { Prisma } from '@prisma/client';
import { IStatisticRepository } from '@repositories/interface/statistic-repository';

export class PrismaStatisticRepository implements IStatisticRepository {
  async create(data: Prisma.StatisticUncheckedCreateInput) {
    const statistic = await prisma.statistic.create({ data });
    return statistic;
  }

  async findById(id: string) {
    const statistic = await prisma.statistic.findUnique({ where: { id } });
    return statistic;
  }
  async findByDisciplineId(disciplineId: string) {
    const statistics = await prisma.statistic.findUnique({
      where: { disciplineId }
    });
    return statistics;
  }

  async delete(id: string) {
    const statistic = await prisma.statistic.delete({ where: { id } });
    return statistic;
  }

  async update(id: string, data: Prisma.StatisticUpdateInput) {
    const statistic = await prisma.statistic.update({ where: { id }, data });

    return statistic;
  }

  async findAll() {
    const statistics = await prisma.statistic.findMany();
    return statistics;
  }
  async upsert(id: string, data: Prisma.StatisticUncheckedCreateInput) {
    const statistic = await prisma.statistic.upsert({
      where: { id },
      update: data,
      create: data,
    });
    return statistic;
  }
}
