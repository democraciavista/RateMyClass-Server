import { DeleteDisciplinaUseCase } from '../../disciplina/delete-disciplina-use-case';
import { PrismaDisciplinaRepository } from '@repositories/prisma/prisma-disciplina-repository';

export function makeDeleteDisciplinaUseCase() {
  const disciplinaRepository = new PrismaDisciplinaRepository();
  return new DeleteDisciplinaUseCase(disciplinaRepository);
}