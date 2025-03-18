import { NotFoundError } from '@errors/not-found-error';
import { Material } from '@prisma/client';

interface GetByIdMaterialUseCaseResponse {
  material: Material;
}
import { IMaterialRepository } from '@repositories/interface/material-repository';

export class GetByIdMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute(id: string): Promise<GetByIdMaterialUseCaseResponse> {
    const material = await this.materialRepository.findById(id);
    if (!material) {
      throw new NotFoundError('Material não encontrado');
    }

    return { material };
  }
}
