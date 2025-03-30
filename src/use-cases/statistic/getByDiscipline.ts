import { NotFoundError } from '@errors/not-found-error';
import { Statistic } from '@prisma/client';
import { IStatisticRepository } from '@repositories/interface/statistic-repository';
interface GetByDisciplineStatisticUseCaseResponse {
  statistic: Statistic;
}

export class GetByDisciplineStatisticUseCase {
  constructor(private statisticRepository: IStatisticRepository) {}

  async execute(id: string): Promise<GetByDisciplineStatisticUseCaseResponse> {
    const statistic = await this.statisticRepository.findByDisciplineId(id);
    if (!statistic) {
      throw new NotFoundError('Estatística não encontrada');
    }

    return { statistic };
  }
}
