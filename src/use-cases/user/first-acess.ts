import { NotFoundError } from '@errors/not-found-error';
import { User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';
import { EmailVerificationSender } from '@services/email-verification-sender';

interface FirstAcessUseCaseRequest {
  email: string;
}

interface FirstAcessUseCaseResponse {
  user: User;
}

export class FirstAcessUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private emailVerificationSender: EmailVerificationSender,
    private generateToken: () => Promise<{
      token: string;
      hashedToken: string;
    }>,
  ) {}
  async execute({
    email,
  }: FirstAcessUseCaseRequest): Promise<FirstAcessUseCaseResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }

      const { token, hashedToken } = await this.generateToken();
      const now = new Date();

      const emailVerifyTokenExpiry = now.setHours(now.getHours() + 1);

      this.emailVerificationSender.sendVerificationEmail(
        token,
        email,
        'emailVerify',
      );

      const userUpdated = await this.userRepository.save(user.id, {
        emailVerificationToken: hashedToken,
        emailTokenExpiry: new Date(emailVerifyTokenExpiry),
      });
      return {
        user: userUpdated,
      };
    } catch (error) {
      throw error;
    }
  }
}
