import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { EmailVerificationSender } from '@services/email-verification-sender';
import { ResetPasswordUseCase } from '@use-cases/user/reset-password';
import { genToken } from '@utils/genToken';

export function makeUserResetPasswordUseCase() {
  const usersRepository = new PrismaUserRepository();
  const emailSender = new EmailVerificationSender();
  const resetPasswordUseCase = new ResetPasswordUseCase(
    usersRepository,
    emailSender,
    genToken,
  );
  return resetPasswordUseCase;
}
