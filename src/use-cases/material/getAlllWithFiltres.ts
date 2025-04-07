import { Material, Prisma, Discipline, Reaction } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';

type RegisterMaterialUseCaseResponse = (Material & {
  discipline: Discipline;
  reactions: Reaction[];
  reviewsLike: Reaction[];
  reviewsFavorite: Reaction[];
  reviewsReport: Reaction[];
  reviewsLikeCount: number;
})[];

interface GetAllWithFiltresMaterialUseCaseRequest {
  userId: string;
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
    try {
      const material = await this.materialRepository.findByFiltres(
        data.userId,
        data.title,
        data.disciplina,
        data.curso,
        data.professor,
        data.ordem,
        data.ordemBy,
      );

      const dataReturn = material.map((item) => ({
        ...item,
        reviewsLike: item.reactions.filter(
          (reaction) => reaction.type === 'LIKE',
        ),
        reviewsFavorite: item.reactions.filter(
          (reaction) => reaction.type === 'FAVORITE',
        ),
        reviewsReport: item.reactions.filter(
          (reaction) => reaction.type === 'REPORT',
        ),
        reviewsLikeCount: item.reactions.filter(
          (reaction) => reaction.type === 'LIKE',
        ).length,
      }));

      return dataReturn;
    } catch (error) {
      throw error;
    }
  }
}
