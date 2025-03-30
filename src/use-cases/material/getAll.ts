import { Material } from "@prisma/client";
import { IMaterialRepository } from "@repositories/interface/material-repository";

interface RegisterMaterialUseCaseResponse {
  material: Material[];
}

export class GetAllMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute(): Promise<RegisterMaterialUseCaseResponse> {
    try {
    const material = await this.materialRepository.findAll();
    return { material };
  }catch (error) {
      throw error;
    }
  }
}