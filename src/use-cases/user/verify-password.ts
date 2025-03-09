import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { IUserRepository } from '@repositories/interface/user-repository';
import { NotFoundError } from '@errors/not-found-error';
import { InvalidTokenError } from '@errors/invalid-token-error';

interface VerifyPasswordUseCaseRequest {
  email: string;
  token: string;
  newPassword: string;
}

interface VerifyPasswordUseCaseResponse {
  user: User;
}

export class VerifyPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: VerifyPasswordUseCaseRequest,
  ): Promise<VerifyPasswordUseCaseResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (!user.resetPasswordToken || !user.resetPasswordTokenExpiry) {
      throw new InvalidTokenError();
    }

    if (user.resetPasswordTokenExpiry < new Date()) {
      throw new InvalidTokenError();
    }

    const isTokenValid = await compare(data.token, user.resetPasswordToken);

    if (!isTokenValid) {
      throw new InvalidTokenError();
    }
    const hashedPassword = await hash(data.newPassword, 8);

    const userUpdated = await this.userRepository.save(user.id, {
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
      password: hashedPassword,
    });

    return {
      user: userUpdated,
    };
  }
}
