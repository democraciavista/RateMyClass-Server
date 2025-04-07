import { $Enums, Discipline, Prisma } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface GetAllByFiltresDisciplineUseCaseRequest {
  userId: string;
  name?: string;
  code?: string;
  course?: string;
  center?: string;
  period?: number;
  professor?: string;
  type?: $Enums.CourseType;
  ordem?: Prisma.SortOrder;
  ordemBy?: string;
}
interface GetAllByFiltresDisciplineUseCaseResponse {
  disciplines: Discipline[];
}

export class GetAllByFiltresDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute({
    userId,
    center,
    code,
    course,
    name,
    ordem,
    ordemBy,
    period,
    professor,
    type,
  }: GetAllByFiltresDisciplineUseCaseRequest): Promise<GetAllByFiltresDisciplineUseCaseResponse> {
    try {
      const disciplines = await this.disciplineRepository.findByFiltres(
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
    } catch (error) {
      throw error;
    }
  }
}
