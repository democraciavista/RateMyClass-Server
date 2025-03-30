import { PrismaStatisticRepository } from '@repositories/prisma/prisma-statistic-repository';
import { GetByIdStatisticUseCase } from '@use-cases/statistic/getById';

function makeGetByIdStatisticUseCase() {
  const statisticRepository = new PrismaStatisticRepository();
  return new GetByIdStatisticUseCase(statisticRepository);
}
export { makeGetByIdStatisticUseCase };
