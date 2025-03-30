import { PrismaDisciplineRepository } from "@repositories/prisma/prisma-discipline-repository";
import { UpdateDisciplineUserCase } from "@use-cases/disciplina/update";

export function makeUpdateDisciplineUseCase() {
  const disciplinaRepository = new PrismaDisciplineRepository();
  return new UpdateDisciplineUserCase(disciplinaRepository);
}