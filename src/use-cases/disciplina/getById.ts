import { NotFoundError } from '@errors/not-found-error';
import { Discipline } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface getByIdDisciplineUseCaseResponse {
  discipline: Discipline;
}
export class getByIdDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(id: string): Promise<getByIdDisciplineUseCaseResponse> {
    const discipline = await this.disciplineRepository.findById(id);
    if (!discipline) {
      throw new NotFoundError('Disciplina não encontrada');
    }
    return { discipline };
  }
}
