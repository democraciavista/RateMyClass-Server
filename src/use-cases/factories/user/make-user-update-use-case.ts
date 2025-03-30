import { PrismaUserRepository } from "@repositories/prisma/prisma-user-repository";
import { UpdateUseCase } from "@use-cases/user/update";

export function makeUserUpdateUseCase() {
    const UsersRepository = new PrismaUserRepository();
    const updateUseCase = new UpdateUseCase(UsersRepository);
    return updateUseCase;
}