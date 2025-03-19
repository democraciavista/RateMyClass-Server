import { $Enums } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface RegisterDisciplineUseCaseRequest {
  code: string;
  name: string;
  professor: string;
  center: string;
  period: number;
  hours: number;
  course: string;
  type: $Enums.CourseType;
}
export class RegisterDisciplineUseCase {
  constructor(private disciplinaRepository: IDisciplineRepository) {}

  async execute(data: RegisterDisciplineUseCaseRequest) {
    return this.disciplinaRepository.create(data);
  }
}
