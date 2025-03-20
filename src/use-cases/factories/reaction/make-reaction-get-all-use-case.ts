import { PrismaReactionRepository } from "@repositories/prisma/prisma-reaction-repository";
import { GetAllReactionUseCase } from "@use-cases/reaction/getAll";

export function makeGetAllReactionUseCase() {
  const ReactionsRepository = new PrismaReactionRepository();
  const getAllUseCase = new GetAllReactionUseCase(ReactionsRepository);
  return getAllUseCase;



}