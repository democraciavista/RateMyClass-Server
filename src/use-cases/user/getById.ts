import { NotFoundError } from '@errors/not-found-error';
import { User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';

interface GeyByIdUseCaseResponse {
  user: User;
}

export class GetByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<GeyByIdUseCaseResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    return { user };
  }
}
