import { DisciplinaRepository } from '@repositories/disciplina-repository';

export class UpdateDisciplinaUseCase {
  constructor(private disciplinaRepository: DisciplinaRepository) {}

  async execute(data: {
    id: string;
    codigo: string;
    nome: string;
    professor: string;
    centro: string;
    periodo: string;
    tipo: string;
  }) {
    return this.disciplinaRepository.update(data.id, data);
  }
}