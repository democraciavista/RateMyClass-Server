import { GetDisciplinaByIdUseCase } from '../../disciplina/get-disciplina-by-id-use-case';
import { PrismaDisciplinaRepository } from '@repositories/prisma/prisma-disciplina-repository';

export function makeGetDisciplinaByIdUseCase() {
  const disciplinaRepository = new PrismaDisciplinaRepository();
  return new GetDisciplinaByIdUseCase(disciplinaRepository);
}