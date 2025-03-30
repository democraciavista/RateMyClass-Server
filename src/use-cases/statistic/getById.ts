import { NotFoundError } from '@errors/not-found-error';
import { Statistic } from '@prisma/client';
import { IStatisticRepository } from '@repositories/interface/statistic-repository';
interface GetByIdStatisticUseCaseResponse {
  statistic: Statistic;
}

export class GetByIdStatisticUseCase {
  constructor(private statisticRepository: IStatisticRepository) {}

  async execute(id: string): Promise<GetByIdStatisticUseCaseResponse> {
    const statistic = await this.statisticRepository.findById(id);
    if (!statistic) {
      throw new NotFoundError('Estatística não encontrada');
    }

    return { statistic };
  }
}
