import { Material, Prisma } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';

interface RegisterMaterialUseCaseResponse {
  material: Material[];
}
interface GetAllWithFiltresMaterialUseCaseRequest {
  title?: string;
  disciplina?: string;
  curso?: string;
  professor?: string;
  ordem?: Prisma.SortOrder;
  ordemBy?: string;
}

export class GetAllWithFiltresMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute(
    data: GetAllWithFiltresMaterialUseCaseRequest,
  ): Promise<RegisterMaterialUseCaseResponse> {
    const material = await this.materialRepository.findByFiltres(
        data.title,
        data.disciplina,
        data.curso,
        data.professor,
        data.ordem,
        data.ordemBy,
        );
    return { material };
  }
}
