import { UpdateDisciplinaUseCase } from '../../disciplina/update-disciplina-use-case';
import { PrismaDisciplinaRepository } from '@repositories/prisma/prisma-disciplina-repository';

export function makeUpdateDisciplinaUseCase() {
  const disciplinaRepository = new PrismaDisciplinaRepository();
  return new UpdateDisciplinaUseCase(disciplinaRepository);
}