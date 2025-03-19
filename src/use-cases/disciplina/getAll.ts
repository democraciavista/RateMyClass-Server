import { Discipline } from "@prisma/client";
import { IDisciplineRepository } from "@repositories/interface/discipline-repository";

interface GetAllDisciplineUseCaseResponse {
  disciplines: Discipline[];
}

export class GetAllDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(): Promise<GetAllDisciplineUseCaseResponse> {
    const disciplines = await this.disciplineRepository.findAll();
    return { disciplines };
  }
}