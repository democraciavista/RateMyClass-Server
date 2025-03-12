import { GetAllDisciplinasUseCase } from '../../disciplina/get-all-disciplinas-use-case';
import { PrismaDisciplinaRepository } from '@repositories/prisma/prisma-disciplina-repository';

export function makeGetAllDisciplinasUseCase() {
  const disciplinaRepository = new PrismaDisciplinaRepository();
  return new GetAllDisciplinasUseCase(disciplinaRepository);
}