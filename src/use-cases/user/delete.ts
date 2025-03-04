/* eslint-disable no-unused-vars */
import { User } from '@prisma/client';

import { IUserRepository } from '@repositories/user-repository';

interface DeleteUseCaseResponse {
  user: User;
}

export class DeleteUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    const user = await this.userRepository.delete(id);

    return { user };
  }
}
