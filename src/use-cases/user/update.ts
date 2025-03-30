import { NotFoundError } from '@errors/not-found-error';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';

interface UpdateUseCaseRequest {
  id: string;
  data: Prisma.UserUpdateInput;
}
interface UpdateUseCaseResponse {
  user: User;
}

export class UpdateUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findById(data.id);
    if (!userAlreadyExists) {
      throw new NotFoundError('Usuário não encontrado');
    }
    const user = await this.userRepository.save(data.id, data.data);
    return { user };
  }
}
