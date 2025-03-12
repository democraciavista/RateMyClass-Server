import { PrismaUserRepository } from "@repositories/prisma/prisma-user-repository"
import { GetAllUserUseCase } from "@use-cases/user/getAll"

function makeUserGetAll(){
    const userRepository = new PrismaUserRepository()
    const getAllUserUseCase = new GetAllUserUseCase(userRepository)
    return getAllUserUseCase
}
export { makeUserGetAll }