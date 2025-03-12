import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { GetAllWithFiltresMaterialUseCase } from '@use-cases/material/getAlllWithFiltres';

export function makeGetAllWithFiltresMaterialUseCase() {
  const MaterialsRepository = new PrismaMaterialRepository();
  const updateUseCase = new GetAllWithFiltresMaterialUseCase(MaterialsRepository);
  return updateUseCase;



}