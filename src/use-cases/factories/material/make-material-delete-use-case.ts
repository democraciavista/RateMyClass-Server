import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { DeleteMaterialUseCase } from '@use-cases/material/delete';

export function makeDeleteMaterialUseCase() {
  const MaterialsRepository = new PrismaMaterialRepository();
  const deleteUseCase = new DeleteMaterialUseCase(MaterialsRepository);
  return deleteUseCase;
}
