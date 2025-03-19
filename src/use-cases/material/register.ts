import { NotFoundError } from '@errors/not-found-error';
import { Material } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';
import { ISubjectRepository } from '@repositories/interface/discipline-repository';
import { IUserRepository } from '@repositories/interface/user-repository';

interface RegisterMaterialUseCaseRequest {
  title: string;
  link: string;
  userId: string;
  subjectId: string;
}
interface RegisterMaterialUseCaseResponse {
  material: Material;
}

export class RegisterMaterialUseCase {
  constructor(
    private materialRepository: IMaterialRepository,
    private userRepository: IUserRepository,
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute(
    data: RegisterMaterialUseCaseRequest,
  ): Promise<RegisterMaterialUseCaseResponse> {
    const userExist = await this.userRepository.findById(data.userId);
    if (!userExist) {
      throw new NotFoundError('Usuário não encontrado');
    }
    const subjectExist = await this.subjectRepository.findById(data.subjectId);
    if (!subjectExist) {
      throw new NotFoundError('Matéria não encontrada');
    }
    const material = await this.materialRepository.create(data);

    return { material };
  }
}
