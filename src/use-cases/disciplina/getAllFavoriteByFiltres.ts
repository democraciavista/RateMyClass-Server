import { $Enums, Discipline, Prisma } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface GetAllFavoriteByFiltresDisciplineUseCaseRequest {
  name?: string;
  code?: string;
  course?: string;
  center?: string;
  period?: number;
  professor?: string;
  type?: $Enums.CourseType;
  ordem?: Prisma.SortOrder;
  ordemBy?: string;
  userId: string;
}
interface GetAllFavoriteByFiltresDisciplineUseCaseResponse {
  disciplines: Discipline[];
}

export class GetAllFavoriteByFiltresDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute({
    center,
    code,
    course,
    name,
    ordem,
    ordemBy,
    period,
    professor,
    type,
    userId,
  }: GetAllFavoriteByFiltresDisciplineUseCaseRequest): Promise<GetAllFavoriteByFiltresDisciplineUseCaseResponse> {
    const disciplines = await this.disciplineRepository.findFavoriteByFiltres(
      userId,
      name,
      code,
      course,
      center,
      period,
      professor,
      type,
      ordem,
      ordemBy,
    );
    return { disciplines };
  }
}
