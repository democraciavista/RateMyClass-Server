import { PrismaStatisticRepository } from "@repositories/prisma/prisma-statistic-repository";
import { GetAllStatisticUseCase } from "@use-cases/statistic/getAll";

export function makeGetAllStatisticUseCase() {
  const StatisticRepository = new PrismaStatisticRepository();
  const getAllUseCase = new GetAllStatisticUseCase(StatisticRepository);
  return getAllUseCase;
}