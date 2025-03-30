import { User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';
import { InvalidCredentialsError } from '@errors/invalid-credentials-error';
import { NotFoundError } from '@errors/not-found-error';
import { EmailVerificationSender } from '@services/email-verification-sender';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailVerificationSender: EmailVerificationSender,
    private generateToken: () => Promise<{
      token: string;
      hashedToken: string;
    }>,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.emailVerified) {
      const { token, hashedToken } = await this.generateToken();
      const now = new Date();
      const emailVerifyTokenExpiry = now.setHours(now.getHours() + 1);

      this.emailVerificationSender.sendVerificationEmail(token, email);
      await this.userRepository.save(user.id, {
        emailVerificationToken: hashedToken,
        emailTokenExpiry: new Date(emailVerifyTokenExpiry),
      });
      throw new NotFoundError(
        'Email não verificado, verifique seu email para liberar o acesso',
      );
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
