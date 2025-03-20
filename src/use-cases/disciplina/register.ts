import { $Enums, Discipline } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface RegisterDisciplineUseCaseRequest {
  code: string;
  name: string;
  professor: string;
  center: string;
  period?: number;
  hours: number;
  course: string;
  type: $Enums.CourseType;
}

interface RegisterDisciplineUseCaseResponse {
  discipline: Discipline;
}
export class RegisterDisciplineUseCase {
  constructor(private disciplinaRepository: IDisciplineRepository) {}

  async execute(
    data: RegisterDisciplineUseCaseRequest,
  ): Promise<RegisterDisciplineUseCaseResponse> {
    try {
    const discipline = await this.disciplinaRepository.create(data);

    return { discipline };
  }catch (error) {
      throw error;
    }
  }
}
