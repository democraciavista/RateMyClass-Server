import { PrismaReactionRepository } from "@repositories/prisma/prisma-reaction-repository";
import { GetByIdReactionUseCase } from "@use-cases/reaction/getById";

 function makeGetByIdReactionUseCase() {
  const ReactionRepository = new PrismaReactionRepository();
  return new GetByIdReactionUseCase(ReactionRepository);
}
export { makeGetByIdReactionUseCase };
