import { DisciplinaRepository } from '@repositories/disciplina-repository';

export class DeleteDisciplinaUseCase {
  constructor(private disciplinaRepository: DisciplinaRepository) {}

  async execute(data: { id: string }) {
    return this.disciplinaRepository.delete(data.id);
  }
}