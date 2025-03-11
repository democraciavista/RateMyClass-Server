import { DisciplinaRepository } from '@repositories/disciplina-repository';

export class CreateDisciplinaUseCase {
  constructor(private disciplinaRepository: DisciplinaRepository) {}

  async execute(data: {
    codigo: string;
    nome: string;
    professor: string;
    centro: string;
    periodo: string;
    tipo: string;
  }) {
    return this.disciplinaRepository.create(data);
  }
}