import { $Enums, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { IUserRepository } from '@repositories/interface/user-repository';
import { AlreadyExistsError } from '@errors/already-exists-error';

interface RegisterUseCaseRequest {
  email: string;
  password: string;
  role?: $Enums.Role;
  course: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    try {
      const hashedPassword = await hash(data.password, 10);

      const userAlreadyExists = await this.userRepository.findByEmail(
        data.email,
      );

      if (userAlreadyExists) {
        throw new AlreadyExistsError('Email já cadastrado');
      }

      const user = await this.userRepository.create({
        email: data.email,
        password: hashedPassword,
        role: data.role,
        course: data.course,
      });

      return { user };
    } catch (error) {
      throw error;
    }
  }
}
