import { NotFoundError } from '@errors/not-found-error';
import { Material } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';

interface RegisterMaterialUseCaseResponse {
  material: Material;
}

export class DeleteMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute(id: string): Promise<RegisterMaterialUseCaseResponse> {
    const materialExist = await this.materialRepository.findById(id);
    if (!materialExist) {
      throw new NotFoundError('Material não encontrado');
    }
    const material = await this.materialRepository.delete(id);

    return { material };
  }
}
