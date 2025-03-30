import { PrismaDisciplineRepository } from '@repositories/prisma/prisma-discipline-repository';
import { GetAllDisciplineUseCase } from '@use-cases/disciplina/getAll';

export function makeGetAllDisciplineUseCase() {
  const disciplinaRepository = new PrismaDisciplineRepository();
  return new GetAllDisciplineUseCase(disciplinaRepository);
}