import { NotFoundError } from '@errors/not-found-error';
import { Statistic } from '@prisma/client';
import { IStatisticRepository } from '@repositories/interface/statistic-repository';
interface GetAllStatisticUseCaseResponse {
  statistics: Statistic[];
}

export class GetAllStatisticUseCase {
  constructor(private statisticRepository: IStatisticRepository) {}

  async execute(): Promise<GetAllStatisticUseCaseResponse> {
    const statistics = await this.statisticRepository.findAll();
    if (!statistics) {
      throw new NotFoundError('Estatística não encontrada');
    }

    return { statistics };
  }
}
