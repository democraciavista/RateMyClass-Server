import { NotFoundError } from '@errors/not-found-error';
import { $Enums, Discipline } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface UpdateDisciplineUseCaseRequest {
  code?: string;
  name?: string;
  professor?: string;
  center?: string;
  period?: number;
  hours?: number;
  course?: string;
  type?: $Enums.CourseType;
}

interface UpdateDisciplineUseCaseResponse {
  discipline: Discipline;
}

export class UpdateDisciplineUserCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(
    id: string,
    data: UpdateDisciplineUseCaseRequest,
  ): Promise<UpdateDisciplineUseCaseResponse> {
    const disciplineAlreadyExists = await this.disciplineRepository.findById(
      id,
    );
    if (!disciplineAlreadyExists) {
      throw new NotFoundError('Disciplina não encontrada');
    }
    const discipline = await this.disciplineRepository.update(id, data);
    return { discipline };
  }
}
