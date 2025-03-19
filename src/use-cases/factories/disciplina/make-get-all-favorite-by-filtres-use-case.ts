import { PrismaDisciplineRepository } from '@repositories/prisma/prisma-discipline-repository';
import { GetAllFavoriteByFiltresDisciplineUseCase } from '@use-cases/disciplina/getAllFavoriteByFiltres';

export function makeGetAllFavoriteByFiltresUseCase() {
  const disciplinaRepository = new PrismaDisciplineRepository();
  return new GetAllFavoriteByFiltresDisciplineUseCase(disciplinaRepository);
}
