import { PrismaReactionRepository } from "@repositories/prisma/prisma-reaction-repository";
import { UpdateReactionUseCase } from "@use-cases/reaction/update";

export function makeUpdateReactionUseCase() {
  const ReactionsRepository = new PrismaReactionRepository();
  const updateUseCase = new UpdateReactionUseCase(ReactionsRepository);
  return updateUseCase;
}
