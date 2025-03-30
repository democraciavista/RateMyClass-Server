import { PrismaDisciplineRepository } from "@repositories/prisma/prisma-discipline-repository";
import { GetAllByFiltresDisciplineUseCase } from "@use-cases/disciplina/getAllByFiltres";

export function makeGetAllByFiltresDisciplineUseCase() {
    const disciplinaRepository = new PrismaDisciplineRepository();
    return new GetAllByFiltresDisciplineUseCase(disciplinaRepository);
}