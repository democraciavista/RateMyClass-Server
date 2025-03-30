import { Prisma, Statistic, $Enums } from '@prisma/client';

export interface IStatisticRepository {
  create: (data: Prisma.StatisticUncheckedCreateInput) => Promise<Statistic>;
  findById: (id: string) => Promise<Statistic | null>;
  delete: (id: string) => Promise<Statistic>;
  update: (
    id: string,
    data: Prisma.StatisticUncheckedUpdateInput,
  ) => Promise<Statistic>;
  upsert: (
    id: string,
    data: Prisma.StatisticUncheckedCreateInput,
  ) => Promise<Statistic>;
  findAll: () => Promise<Statistic[]>;
  findByDisciplineId: (disciplineId: string) => Promise<Statistic|null>;
}
