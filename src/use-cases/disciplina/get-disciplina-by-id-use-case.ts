import { DisciplinaRepository } from '@repositories/disciplina-repository';

export class GetDisciplinaByIdUseCase {
  constructor(private disciplinaRepository: DisciplinaRepository) {}

  async execute(data: { id: string }) {
    return this.disciplinaRepository.getById(data.id);
  }
}