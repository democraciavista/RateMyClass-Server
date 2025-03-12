import { User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';

interface GetAllUserUseCaseResponse {
  users: User[];
}
export class GetAllUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<GetAllUserUseCaseResponse> {
    const users = await this.userRepository.findAll();

    return { users };
  }
}
