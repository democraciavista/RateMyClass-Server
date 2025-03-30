import { DisciplinaRepository } from '@repositories/disciplina-repository';

export class GetAllDisciplinasUseCase {
  constructor(private disciplinaRepository: DisciplinaRepository) {}

  async execute() {
    return this.disciplinaRepository.getAll();
  }
}