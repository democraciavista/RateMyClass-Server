import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { EmailVerificationSender } from '@services/email-verification-sender';
import { RegisterUseCase } from '@use-cases/user/register';
import { genToken } from '@utils/genToken';

export function makeUserRegisterUseCase() {
  const usersRepository = new PrismaUserRepository();
  const emailSender = new EmailVerificationSender();
  const registerUseCase = new RegisterUseCase(usersRepository, emailSender, genToken);

  return registerUseCase;
}
