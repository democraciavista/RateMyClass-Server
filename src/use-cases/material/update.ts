import { NotFoundError } from '@errors/not-found-error';
import { Material, Prisma } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';

interface RegisterMaterialUseCaseResponse {
  material: Material;
}

export class UpdateMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute(
    id: string,
    data: Prisma.MaterialUpdateInput,
  ): Promise<RegisterMaterialUseCaseResponse> {
    const materialExist = await this.materialRepository.findById(id);
    if (!materialExist) {
      throw new NotFoundError('Material não encontrado');
    }
    const material = await this.materialRepository.update(id, data);
    return { material };
  }
}
