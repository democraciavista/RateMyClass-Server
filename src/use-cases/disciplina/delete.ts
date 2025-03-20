import { NotFoundError } from '@errors/not-found-error';
import { Discipline } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface DeleteDisciplineUseCaseResponse {
  discipline: Discipline;
}

export class DeleteDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}
  async execute(id: string): Promise<DeleteDisciplineUseCaseResponse> {
    try {
      const disciplineAlreadyExists = await this.disciplineRepository.findById(
        id,
      );
      if (!disciplineAlreadyExists) {
        throw new NotFoundError('Disciplina não encontrada');
      }
      const discipline = await this.disciplineRepository.delete(id);
      return { discipline };
    } catch (error) {
      throw error;
    }
  }
}
