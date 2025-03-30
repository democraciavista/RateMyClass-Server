import { CreateDisciplinaUseCase } from '../../disciplina/create-disciplina-use-case';
import { PrismaDisciplinaRepository } from '@repositories/prisma/prisma-disciplina-repository';

export function makeCreateDisciplinaUseCase() {
  const disciplinaRepository = new PrismaDisciplinaRepository();
  return new CreateDisciplinaUseCase(disciplinaRepository);
}