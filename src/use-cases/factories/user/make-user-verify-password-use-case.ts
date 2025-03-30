import { PrismaUserRepository } from "@repositories/prisma/prisma-user-repository";
import { VerifyPasswordUseCase } from "@use-cases/user/verify-password";

export function makeUserVerifyPasswordUseCase(){
    const usersRepository = new PrismaUserRepository();
    const verifyPasswordUseCase = new VerifyPasswordUseCase(usersRepository);
    return verifyPasswordUseCase;

}