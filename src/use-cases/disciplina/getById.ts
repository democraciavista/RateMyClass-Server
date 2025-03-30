import { NotFoundError } from '@errors/not-found-error';
import { Discipline } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface GetByIdDisciplineUseCaseResponse {
  discipline: Discipline;
}
export class GetByIdDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(id: string): Promise<GetByIdDisciplineUseCaseResponse> {
    try {
      const discipline = await this.disciplineRepository.findById(id);
      if (!discipline) {
        throw new NotFoundError('Disciplina não encontrada');
      }
      return { discipline };
    } catch (error) {
      throw error;
    }
  }
}
