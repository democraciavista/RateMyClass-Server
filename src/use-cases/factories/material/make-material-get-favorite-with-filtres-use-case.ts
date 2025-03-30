import { PrismaMaterialRepository } from '@repositories/prisma/prisma-material-repository';
import { GetFavoriteWithFiltresMaterialUseCase } from '@use-cases/material/getFavoriteWithFiltres';

export function makeGetFavoriteWithFiltresMaterialUseCase() {
  const MaterialsRepository = new PrismaMaterialRepository();
  const updateUseCase = new GetFavoriteWithFiltresMaterialUseCase(MaterialsRepository);
  return updateUseCase;



}