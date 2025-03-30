import { PrismaDisciplineRepository } from "@repositories/prisma/prisma-discipline-repository";
import { DeleteDisciplineUseCase } from "@use-cases/disciplina/delete";

export function makeDeleteDisciplinaUseCase() {
  const disciplinaRepository = new PrismaDisciplineRepository();
  return new DeleteDisciplineUseCase(disciplinaRepository);
}