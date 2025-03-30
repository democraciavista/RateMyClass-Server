import { PrismaStatisticRepository } from '@repositories/prisma/prisma-statistic-repository';
import { GetByDisciplineStatisticUseCase } from '@use-cases/statistic/getByDiscipline';

function makeGetByDisciplineStatisticUseCase() {
  const statisticRepository = new PrismaStatisticRepository();
  return new GetByDisciplineStatisticUseCase(statisticRepository);
}
export { makeGetByDisciplineStatisticUseCase };
