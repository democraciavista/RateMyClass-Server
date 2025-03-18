import { Material, Prisma } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';

interface RegisterMaterialUseCaseResponse {
  material: Material[];
}
interface GetFavoriteWithFiltresMaterialUseCaseRequest {
  userId: string;
  title?: string;
  disciplina?: string;
  curso?: string;
  professor?: string;
  ordem?: Prisma.SortOrder;
  ordemBy?: string;
}

export class GetFavoriteWithFiltresMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute(
    data: GetFavoriteWithFiltresMaterialUseCaseRequest,
  ): Promise<RegisterMaterialUseCaseResponse> {
    const material = await this.materialRepository.findFavoriteByFiltres(
        data.userId,
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
