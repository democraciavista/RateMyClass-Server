import { PrismaDisciplineRepository } from "@repositories/prisma/prisma-discipline-repository";
import { GetByIdDisciplineUseCase } from "@use-cases/disciplina/getById";

export function makeGetDisciplineByIdUseCase() {
  const disciplinaRepository = new PrismaDisciplineRepository();
  return new GetByIdDisciplineUseCase(disciplinaRepository);
}