import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

import { IUserRepository } from '@repositories/interface/user-repository';

import { NotFoundError } from '@errors/not-found-error';
import { InvalidTokenError } from '@errors/invalid-token-error';
import { AlreadyExistsError } from '@errors/already-exists-error';

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
    try {
      const user = await this.userRepository.findByEmail(data.email);

      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }
      if (user.emailVerified) {
        throw new AlreadyExistsError('Email já verificado');
      }

      if (!user.emailVerificationToken || !user.emailTokenExpiry) {
        throw new InvalidTokenError();
      }

      if (user.emailTokenExpiry < new Date()) {
        throw new InvalidTokenError();
      }

      const isTokenValid = await compare(
        data.token,
        user.emailVerificationToken,
      );

      if (!isTokenValid) {
        throw new InvalidTokenError();
      }

      const userUpdated = await this.userRepository.save(user.id, {
        emailVerified: true,
        emailVerificationToken: null,
        emailTokenExpiry: null,
      });

      return {
        user: userUpdated,
      };
    } catch (error) {
      throw error;
    }
  }
}
