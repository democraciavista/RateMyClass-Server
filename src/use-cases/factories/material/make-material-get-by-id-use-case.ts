import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { GetByIdMaterialUseCase } from '@use-cases/material/getById';

 function makeGetByIdMaterialUseCase() {
  const materialRepository = new PrismaMaterialRepository();
  return new GetByIdMaterialUseCase(materialRepository);
}
export { makeGetByIdMaterialUseCase };
