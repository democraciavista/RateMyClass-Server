import { PrismaReactionRepository } from "@repositories/prisma/prisma-reaction-repository";
import { DeleteReactionUseCase } from "@use-cases/reaction/delete";

export function makeDeleteReacionUseCase() {
  const ReacionsRepository = new PrismaReactionRepository();
  const deleteUseCase = new DeleteReactionUseCase(ReacionsRepository);
  return deleteUseCase;
}
