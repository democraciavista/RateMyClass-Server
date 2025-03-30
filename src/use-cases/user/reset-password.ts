import { NotFoundError } from '@errors/not-found-error';
import { User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';
import { EmailVerificationSender } from '@services/email-verification-sender';

interface ResetPasswordUseCaseRequest {
  email: string;
}

interface ResetPasswordUseCaseResponse {
  user: User;
}

export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private emailVerificationSender: EmailVerificationSender,
    private generateToken: () => Promise<{ token: string; hashedToken: string }>,
  ) {}
  async execute({
    email
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    if (!user.emailVerified) {
      throw new NotFoundError('Email não verificado');
    }
    const { token, hashedToken } = await this.generateToken();
    const now = new Date();

    const emailVerifyTokenExpiry = now.setHours(now.getHours() + 1);

    this.emailVerificationSender.sendVerificationEmail(
      token,
      email,
      'passwordReset',
    );

    const userUpdated = await this.userRepository.save(user.id, {
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpiry: new Date(emailVerifyTokenExpiry),
    });
    return {
      user: userUpdated,
    };
  }
}
