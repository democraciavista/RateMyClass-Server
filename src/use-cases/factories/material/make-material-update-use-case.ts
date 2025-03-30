import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { UpdateMaterialUseCase } from '@use-cases/material/update';

export function makeUpdateMaterialUseCase() {
  const MaterialsRepository = new PrismaMaterialRepository();
  const updateUseCase = new UpdateMaterialUseCase(MaterialsRepository);
  return updateUseCase;
}
