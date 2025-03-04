import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

import { IUserRepository } from '@repositories/user-repository';

import { NotFoundError } from '@errors/not-found-error';
import { InvalidTokenError } from '@errors/invalid-token-error';

interface VerifyEmailUseCaseRequest {
  email: string;
  token: string;
}

interface VerifyEmailUseCaseResponse {
  user: User;
}

export class VerifyEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: VerifyEmailUseCaseRequest,
  ): Promise<VerifyEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (!user.emailVerificationToken || !user.emailTokenExpiry) {
      throw new InvalidTokenError();
    }

    if (user.emailTokenExpiry < new Date()) {
      throw new InvalidTokenError();
    }

    const isTokenValid = await compare(data.token, user.emailVerificationToken);

    if (!isTokenValid) {
      throw new InvalidTokenError();
    }

    const userUpdated = await this.userRepository.save({
      ...user,
      emailVerified: true,
      emailVerificationToken: null,
      emailTokenExpiry: null,
    });

    return {
      user: userUpdated,
    };
  }
}
