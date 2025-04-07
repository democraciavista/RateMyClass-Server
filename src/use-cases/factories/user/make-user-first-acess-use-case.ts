import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { EmailVerificationSender } from '@services/email-verification-sender';
import { FirstAcessUseCase } from '@use-cases/user/first-acess';
import { genToken } from '@utils/genToken';

export function makeUserFirstAcessUseCase() {
  const usersRepository = new PrismaUserRepository();
  const emailSender = new EmailVerificationSender();
  const firstAcessUseCase = new FirstAcessUseCase(
    usersRepository,
    emailSender,
    genToken,
  );
  return firstAcessUseCase;
}
