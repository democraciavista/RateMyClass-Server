import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { EmailVerificationSender } from '@services/email-verification-sender';
import { AuthenticateUseCase } from '@use-cases/user/authenticate';
import { genToken } from '@utils/genToken';

export function makeUserAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const EmailSender = new EmailVerificationSender();
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    EmailSender,
    genToken,
  );

  return authenticateUseCase;
}
