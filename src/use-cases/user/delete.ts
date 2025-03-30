import { NotFoundError } from '@errors/not-found-error';
import { User } from '@prisma/client';

import { IUserRepository } from '@repositories/interface/user-repository';

interface DeleteUseCaseResponse {
  user: User;
}

export class DeleteUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findById(id);
    if (!userAlreadyExists) {
      new NotFoundError('Usuário não encontrado');
    }
    const user = await this.userRepository.delete(id);

    return { user };
  }
}
