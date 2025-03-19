import { PrismaDisciplineRepository } from "@repositories/prisma/prisma-discipline-repository";
import { RegisterDisciplineUseCase } from "@use-cases/disciplina/register";

export function makeRegisterDisciplineUseCase() {
  const disciplinaRepository = new PrismaDisciplineRepository();
  return new RegisterDisciplineUseCase(disciplinaRepository);
}